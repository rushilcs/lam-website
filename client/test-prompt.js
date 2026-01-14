// Test script to verify prompt structure
// Run with: node test-prompt.js

import { generate90DayPlan } from './api/helpers.js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

// Test case 1: Direct match to BILL and SEELab
const testCase1 = {
  companyName: "Test Company",
  jobDescription: "develop an internal coding assistant to speed up development efficiency using claude code, then work on building llm and sensor integrations with wearable sensors"
};

// Test case 2: Clustering/system work
const testCase2 = {
  companyName: "Another Company",
  jobDescription: "build production clustering systems for error classification and deploy on AWS"
};

// Test case 3: General ML work
const testCase3 = {
  companyName: "ML Startup",
  jobDescription: "work on production ML systems, model deployment, and MLOps infrastructure"
};

async function testPrompt(testCase, name) {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`TEST CASE: ${name}`);
  console.log(`${'='.repeat(60)}`);
  console.log(`Company: ${testCase.companyName}`);
  console.log(`Job Description: ${testCase.jobDescription}`);
  console.log(`\nGenerating plan...\n`);
  
  try {
    const plan = await generate90DayPlan(
      testCase.companyName,
      testCase.jobDescription
    );
    
    console.log(`PLAN GENERATED:\n${plan}`);
    
    // Check for references
    const hasBill = plan.toLowerCase().includes('bill');
    const hasSeelab = plan.toLowerCase().includes('seelab') || plan.toLowerCase().includes('seelab');
    const hasPromodrone = plan.toLowerCase().includes('promodrone');
    const hasExperience = plan.toLowerCase().includes('experience') || plan.toLowerCase().includes('leveraging') || plan.toLowerCase().includes('building on');
    
    console.log(`\n${'='.repeat(60)}`);
    console.log(`REFERENCE CHECK:`);
    console.log(`  BILL mentioned: ${hasBill ? '✅' : '❌'}`);
    console.log(`  SEELab mentioned: ${hasSeelab ? '✅' : '❌'}`);
    console.log(`  PromoDrone mentioned: ${hasPromodrone ? '✅' : '❌'}`);
    console.log(`  Experience phrases used: ${hasExperience ? '✅' : '❌'}`);
    console.log(`${'='.repeat(60)}\n`);
    
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
}

async function runTests() {
  if (!process.env.OPENAI_API_KEY) {
    console.error('OPENAI_API_KEY not found in .env.local');
    process.exit(1);
  }
  
  await testPrompt(testCase1, "Coding Assistant + Sensor LLM (Direct Match)");
  await testPrompt(testCase2, "Clustering Systems (BILL Match)");
  await testPrompt(testCase3, "Production ML Systems (General)");
}

runTests();
