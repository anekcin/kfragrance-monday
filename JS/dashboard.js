// --- Frequency Charts Functionality ---

function ShowUserFrequency() {
  // Retrieve all registered users
  const registrationData = JSON.parse(localStorage.getItem("RegistrationData")) || [];
  
  // Count frequency by gender
  const genderCount = { Male: 0, Female: 0, Other: 0 };
  registrationData.forEach(user => {
    const gender = user.gender;
    if (genderCount.hasOwnProperty(gender)) {
      genderCount[gender]++;
    } else {
      genderCount["Other"]++;
    }
  });
  
  // Count frequency by age groups: 18-25, 26-35, 36-50, 50+
  const ageGroups = {
    "18-25": 0,
    "26-35": 0,
    "36-50": 0,
    "50+": 0
  };
  registrationData.forEach(user => {
    const dob = new Date(user.dob);
    let age = new Date().getFullYear() - dob.getFullYear();
    const monthDiff = new Date().getMonth() - dob.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && new Date().getDate() < dob.getDate())) {
      age--;
    }
    if (age >= 18 && age <= 25) {
      ageGroups["18-25"]++;
    } else if (age >= 26 && age <= 35) {
      ageGroups["26-35"]++;
    } else if (age >= 36 && age <= 50) {
      ageGroups["36-50"]++;
    } else if (age > 50) {
      ageGroups["50+"]++;
    }
  });
  
  // Build bar chart for gender frequency
  let genderChartHTML = "<h3>Gender Frequency</h3>";
  for (const gender in genderCount) {
    const count = genderCount[gender];
    // Multiply count by 20 to set bar width (adjust multiplier as needed)
    const barWidth = count * 20;
    genderChartHTML += `
      <div style="margin-bottom: 5px;">
        <strong>${gender}:</strong> ${count} 
        <div style="display: inline-block; background-color: #4CAF50; height: 20px; width: ${barWidth}px;"></div>
      </div>
    `;
  }
  
  // Build bar chart for age group frequency
  let ageChartHTML = "<h3>Age Group Frequency</h3>";
  for (const group in ageGroups) {
    const count = ageGroups[group];
    const barWidth = count * 20;
    ageChartHTML += `
      <div style="margin-bottom: 5px;">
        <strong>${group}:</strong> ${count} 
        <div style="display: inline-block; background-color: #2196F3; height: 20px; width: ${barWidth}px;"></div>
      </div>
    `;
  }
  
  // Update the page with the charts
  document.getElementById("genderChart").innerHTML = genderChartHTML;
  document.getElementById("ageChart").innerHTML = ageChartHTML;
}

// --- Invoice Functionality ---

// ShowInvoices() retrieves all invoices from "AllInvoices" and logs them to the console.
function ShowInvoices() {
  const allInvoices = JSON.parse(localStorage.getItem("AllInvoices")) || [];
  console.log("All Invoices:", allInvoices);
}

// GetUserInvoices() retrieves the invoices for a specific user based on TRN from RegistrationData.
function GetUserInvoices(trn) {
  const registrationData = JSON.parse(localStorage.getItem("RegistrationData")) || [];
  const user = registrationData.find(user => user.trn === trn);
  return user && user.invoices ? user.invoices : [];
}

// --- Event Listeners for Invoice Buttons ---

document.addEventListener("DOMContentLoaded", () => {
  // Initialize frequency charts
  ShowUserFrequency();

  // Event listener for showing all invoices
  document.getElementById("showInvoicesButton").addEventListener("click", () => {
    ShowInvoices();
  });

  // Event listener for searching invoices for a specific user by TRN
  document.getElementById("searchUserInvoices").addEventListener("click", () => {
    const trn = document.getElementById("searchTRN").value.trim();
    const invoices = GetUserInvoices(trn);
    let outputHTML = "<h4>User Invoices:</h4>";
    if (invoices.length > 0) {
      invoices.forEach(inv => {
        outputHTML += `<div style="border: 1px solid #ccc; padding: 5px; margin-bottom: 5px;">
          <p><strong>Invoice Number:</strong> ${inv.invoiceNumber}</p>
          <p><strong>Date:</strong> ${new Date(inv.date).toLocaleDateString()}</p>
          <p><strong>Total:</strong> $${inv.total}</p>
        </div>`;
      });
    } else {
      outputHTML += `<p>No invoices found for TRN "${trn}".</p>`;
    }
    document.getElementById("userInvoicesDisplay").innerHTML = outputHTML;
  });
});
