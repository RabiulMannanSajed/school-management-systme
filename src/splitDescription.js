// splitDescription.js

import fs from "fs"; // <-- only works if you are using Node 20+ or "type": "module" in package.json

// If you're not using ES modules, use:
// const fs = require("fs");

const items = [
  {
    row_number: 4,
    "(Do Not Modify) Lead": "663f5c5e-637e-ec11-80e2-000c292beb74",
    "(Do Not Modify) Row Checksum":
      "Xsik/nq7XaplmCiJEoYxxsvIqAMrdcyeM7X/fAhAyCfbgW6Qb+FyjT6kkWUUmzB4NWAJpLeDr5PdFF+t7OuwQw==",
    "(Do Not Modify) Modified On": "9/17/25 4:47",
    Website: "http://www.accessitgroup.com",
    Description:
      "UPDATED RESEARCH:\n\nJoe Luciano, CEO, joel@accessitgroup.com, jluciano@accessitgroup.com, 9733166016517, 973.886.0204\nDavid Hark, President, davidh@accessitgroup.com, dhark@accessitgroup.com, 215.260.3693, 610.784.0672\n\n*Tech123*\n\nServices/Apps/Products: Cybersecurity Solutions Provider, Cloud Service \nCareer:: \nNotes:: https://www.linkedin.com/company/accessit-group/\n\nTargets>>>\n\nDavid Hark - Chief Operating Officer (davidh@accessitgroup.com, dhark@accessitgroup.com) ext. 620, 215.260.3693\n\nJoseph Luciano - Chief Executive Officer (jluciano@accessitgroup.com) (joel@accessitgroup.com) ext. 517, 973.886.0204\n\nNumbers:\n610-783-5200\n866-748-2484\n\n973.394.5602 (Not in service)\n610 783-5151 (Fax)\n\n\n\nNEW COMPANY NUMBER: 610.783.5200, 610.783.5151",
    "Founded On": 2001,
    "Research Request": "BLANK",
    "Reseach Type": "Bulk Research- Positive",
    "Research Result": "New contacts found",
    "Researched By": "Md. Shariful Islam Akash",
    "Research Date": "10/11/2025",
  },
  {
    row_number: 5,
    "(Do Not Modify) Lead": "90bf8afa-1804-e911-80d1-00113b0eabdf",
    "(Do Not Modify) Row Checksum":
      "1eTccNlSwWdMNzBeWlLQGoe7u0JBV6ppf2JlFpfSAtw5DlEip3j7T7I1OUEuR0LBvLAO4rPRYCcfnkmhRvM8dg==",
    "(Do Not Modify) Modified On": "10/1/25 3:35",
    Website: "https://www.achronix.com",
    Description: `UPDATED RESEARCH:

Robert Blake, Chief Executive Officer, robert@achronix.com, robert.blake@achronix.com, 408.889.4122, 408.621.8794

Services/Apps/Products:: Software Products  
Industry Focus::  
Founded::  2004
Exemplify::
Career:: 
Notes::
https://www.linkedin.com/company/achronix-semiconductor/

Targets>>>1 Sales, 2 Marketing, 3 Ts, 0 opt, # DBND 3 FN

Robert Blake - President and Chief Executive Officer
‪+1 408-621-8794‬ LUSHA) , robert@achronix.com, robert.blake@achronix.com, 408.889.4122

Kai He, Director of Applications Engineering, kai.he@achronix.com, he@achronix.com, 408.934.4382

Randolf Jurrat- Vice President of Operations (1) 408.889.4114 (Seamless), randolf@achronix.com, randolf.jurrat@achronix.com, 408.204.7687

Scott Senst - Software Engineering Director, scott@achronix.com, scottsenst@achronix.com, 507.358.0708, 408.286.3645

Raymond Nijssen - Vice President and Chief Technologist, raymond@zeropage.com, raymond@achronix.com, 408.889.4189, 408.394.5182 (wrong number)

John Lofton Holt - Founder

Dr. Virantha N. Ekanayake - Founder and Chief Technology Officer (Dbnd 847) (1)

Dr. Kamal Choudhary - Senior Vice President Software Engineering*4186

Ameet Sanghavi - Sr. Manager, Applications Engineering*4146 (xDbnd)
Volkan Oktem - Senior Director of Product Applications

Numbers:
408-889-4100
408.961.6435 (Not in use)

NEW COMPANY NUMBER: 408.889.4100, 408.286.3645`,
    "Founded On": 2004,
    "Research Request": "BLANK",
    "Reseach Type": "Bulk Research- Positive",
    "Research Result": "New contacts found",
    "Researched By": "Md. Shariful Islam Akash",
    "Research Date": "10/11/2025",
  },
];

function splitDescription(item) {
  const description = item.Description;
  if (!description) return item;

  // Use a regex that matches even with extra spaces
  const splitRegex = /(Services\/Apps\/Products::[\s\S]*)/;

  // Find the index of the marker instead of using split
  const match = description.match(/Services\/Apps\/Products::/);

  let first_pera_content = "";
  let second_pera_content = "";

  if (match) {
    const idx = match.index;

    // Everything before the marker
    first_pera_content = description
      .slice(0, idx)
      .replace(/^UPDATED RESEARCH:\s*/, "")
      .trim();

    // Everything from the marker onwards
    second_pera_content = description.slice(idx).trim();
  } else {
    // If no marker found
    first_pera_content = description.trim();
    second_pera_content = "";
  }

  item.first_pera_content = first_pera_content;
  item.second_pera_content = second_pera_content;
  return item;
}
const result = items.map(splitDescription);

// Print the result to the console
console.log("✅ Split Result:\n", JSON.stringify(result, null, 2));
