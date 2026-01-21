// Google Sheets-based logging
// Uses Google Sheets API to store logs in a spreadsheet

import { google } from 'googleapis';

/**
 * Get authenticated Google Sheets client
 */
async function getSheetsClient() {
  try {
    // Get service account credentials from environment variable
    const credentialsJson = process.env.GOOGLE_SERVICE_ACCOUNT_CREDENTIALS;
    
    if (!credentialsJson) {
      console.warn('[Logger] GOOGLE_SERVICE_ACCOUNT_CREDENTIALS not set, logging disabled');
      return null;
    }

    // Parse the JSON credentials
    const credentials = JSON.parse(credentialsJson);
    
    // Create JWT client for service account
    const auth = new google.auth.JWT(
      credentials.client_email,
      null,
      credentials.private_key,
      ['https://www.googleapis.com/auth/spreadsheets']
    );

    const sheets = google.sheets({ version: 'v4', auth });
    return sheets;
  } catch (error) {
    console.error('[Logger] Error initializing Google Sheets client:', error);
    return null;
  }
}

/**
 * Get the spreadsheet ID from environment variable
 */
function getSpreadsheetId() {
  return process.env.GOOGLE_SHEET_ID;
}

const PLAN_SHEET_NAME = 'Plan Generator Logs';
const CHATBOT_SHEET_NAME = 'Chatbot Logs';

function getHeadersForSheet(sheetName) {
  if (sheetName === PLAN_SHEET_NAME) {
    return [
      'Timestamp',
      'Company Name',
      'Job Description',
      'Job Description Length',
      'Is URL',
      'Plan',
      'Plan Length',
      'Job Fit',
      'Job Fit Length',
      'Metadata',
      'Error',
    ];
  }

  if (sheetName === CHATBOT_SHEET_NAME) {
    return [
      'Timestamp',
      'Message',
      'Message Length',
      'Conversation History Length',
      'Response',
      'Response Length',
      'Metadata',
      'Error',
    ];
  }

  return ['Timestamp', 'Payload'];
}

async function ensureSheetExistsAndHasHeader(sheets, spreadsheetId, sheetName) {
  // 1) Ensure the sheet/tab exists
  const spreadsheet = await sheets.spreadsheets.get({ spreadsheetId });
  const existingTitles = (spreadsheet.data.sheets || []).map(
    (s) => s.properties && s.properties.title
  );

  if (!existingTitles.includes(sheetName)) {
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId,
      resource: {
        requests: [{ addSheet: { properties: { title: sheetName } } }],
      },
    });
  }

  // 2) Ensure header row exists (A1 populated)
  const headerResp = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `${sheetName}!A1:Z1`,
  });

  const firstRow = (headerResp.data.values && headerResp.data.values[0]) || [];
  const headers = getHeadersForSheet(sheetName);

  if (firstRow.length === 0) {
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `${sheetName}!A1`,
      valueInputOption: 'RAW',
      resource: { values: [headers] },
    });
  }
}

/**
 * Append a row to a Google Sheet
 */
async function appendRow(sheetName, values) {
  try {
    const sheets = await getSheetsClient();
    const spreadsheetId = getSpreadsheetId();

    if (!sheets || !spreadsheetId) {
      console.warn('[Logger] Google Sheets not configured, skipping log');
      return;
    }

    await ensureSheetExistsAndHasHeader(sheets, spreadsheetId, sheetName);

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: `${sheetName}!A:Z`,
      valueInputOption: 'RAW',
      insertDataOption: 'INSERT_ROWS',
      resource: {
        values: [values],
      },
    });

    console.log(`[Logger] Log appended to ${sheetName}`);
  } catch (error) {
    console.error(
      `[Logger] Error appending to ${sheetName}:`,
      error?.message || error
    );
    if (error?.response?.data?.error) {
      console.error('[Logger] Google API error:', error.response.data.error);
    }
    console.error(
      `[Logger] Troubleshooting: ensure GOOGLE_SHEET_ID is correct, the service account email is shared as Editor, and GOOGLE_SERVICE_ACCOUNT_CREDENTIALS is valid JSON.`
    );
    // Don't throw - logging failures shouldn't break the API
  }
}

/**
 * Read rows from a Google Sheet
 */
async function readRows(sheetName, limit = 1000) {
  try {
    const sheets = await getSheetsClient();
    const spreadsheetId = getSpreadsheetId();

    if (!sheets || !spreadsheetId) {
      return [];
    }

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `${sheetName}!A:Z`,
    });

    const rows = response.data.values || [];
    
    // Skip header row and limit results
    const dataRows = rows.slice(1).slice(0, limit);
    
    return dataRows;
  } catch (error) {
    console.error(`[Logger] Error reading from ${sheetName}:`, error);
    return [];
  }
}

/**
 * Initialize Google Sheet with headers (run once manually or via setup script)
 * This creates the header rows for both sheets
 */
export async function initSheets() {
  try {
    const sheets = await getSheetsClient();
    const spreadsheetId = getSpreadsheetId();

    if (!sheets || !spreadsheetId) {
      console.error('[Logger] Google Sheets not configured');
      return;
    }

    // Idempotent: create missing tabs + header row if missing
    await ensureSheetExistsAndHasHeader(sheets, spreadsheetId, PLAN_SHEET_NAME);
    await ensureSheetExistsAndHasHeader(sheets, spreadsheetId, CHATBOT_SHEET_NAME);

    console.log('[Logger] Google Sheets initialized with headers');
  } catch (error) {
    console.error('[Logger] Error initializing sheets:', error);
  }
}

/**
 * Log a plan generator interaction
 */
export async function logPlanGenerator(data) {
  const timestamp = new Date().toISOString();
  
  const row = [
    timestamp,
    data.companyName || '',
    data.jobDescription || '',
    data.jobDescription?.length || 0,
    data.isUrl || false,
    data.plan || '',
    data.plan?.length || 0,
    data.jobFit || '',
    data.jobFit?.length || 0,
    JSON.stringify(data.metadata || {}),
    data.error || '',
  ];

  await appendRow(PLAN_SHEET_NAME, row);
}

/**
 * Log a chatbot interaction
 */
export async function logChatbot(data) {
  const timestamp = new Date().toISOString();
  
  const row = [
    timestamp,
    data.message || '',
    data.message?.length || 0,
    data.conversationHistory?.length || 0,
    data.response || '',
    data.response?.length || 0,
    JSON.stringify(data.metadata || {}),
    data.error || '',
  ];

  await appendRow(CHATBOT_SHEET_NAME, row);
}

/**
 * Get all plan generator logs
 */
export async function getPlanLogs(limit = 1000) {
  const rows = await readRows(PLAN_SHEET_NAME, limit);
  
  return rows.map(row => {
    let metadata = {};
    try {
      if (row[9]) {
        metadata = JSON.parse(row[9]);
      }
    } catch (e) {
      console.warn('[Logger] Error parsing metadata JSON:', e);
    }
    
    return {
      timestamp: row[0] || '',
      userInput: {
        companyName: row[1] || '',
        jobDescription: row[2] || '',
        jobDescriptionLength: parseInt(row[3]) || 0,
        isUrl: row[4] === 'true' || row[4] === true,
      },
      modelOutput: {
        plan: row[5] || '',
        planLength: parseInt(row[6]) || 0,
        jobFit: row[7] || '',
        jobFitLength: parseInt(row[8]) || 0,
      },
      metadata,
      error: row[10] || null,
    };
  });
}

/**
 * Get all chatbot logs
 */
export async function getChatbotLogs(limit = 1000) {
  const rows = await readRows(CHATBOT_SHEET_NAME, limit);
  
  return rows.map(row => {
    let metadata = {};
    try {
      if (row[6]) {
        metadata = JSON.parse(row[6]);
      }
    } catch (e) {
      console.warn('[Logger] Error parsing metadata JSON:', e);
    }
    
    return {
      timestamp: row[0] || '',
      userInput: {
        message: row[1] || '',
        messageLength: parseInt(row[2]) || 0,
        conversationHistoryLength: parseInt(row[3]) || 0,
      },
      modelOutput: {
        response: row[4] || '',
        responseLength: parseInt(row[5]) || 0,
      },
      metadata,
      error: row[7] || null,
    };
  });
}

/**
 * Get log statistics
 */
export async function getLogStats() {
  try {
    const [planRows, chatbotRows] = await Promise.all([
      readRows(PLAN_SHEET_NAME, 10000),
      readRows(CHATBOT_SHEET_NAME, 10000),
    ]);

    return {
      planGenerator: {
        total: planRows.length,
      },
      chatbot: {
        total: chatbotRows.length,
      },
    };
  } catch (error) {
    console.error('[Logger] Error getting stats:', error);
    return {
      planGenerator: { total: 0 },
      chatbot: { total: 0 },
    };
  }
}
