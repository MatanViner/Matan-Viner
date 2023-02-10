if (!currentUser) {
  window.location.replace("login/?from=progress");
}

const overlayHTML = '<div class="overlaye"><h1>התהליך שלי</h1></div>';
const overlay = document.createElement("div");
overlay.innerHTML = overlayHTML;
header.appendChild(overlay);

const titles = {
  fat: "אחוז שומן",
  weight: "משקל בקילוגרם",
  circumference: "היקפי גוף",
};

document.getElementById("showChart").onclick = async function (e) {
  e.preventDefault();
  const chartType = document.getElementById("chartType").value;
  if (chartType === "unchoosed") {
    errorMsg("אנא בחר פרמטר להצגה.");
    return;
  }
  const customer = new Customer(JSON.parse(currentUser));
  document.getElementById("measurementsTable").style.visibility = "visible";
  const fromDate = document.getElementById("startDate").value || "2000-01-01";
  const toDate = document.getElementById("endDate").value || "2100-01-01";

  const response = await fetch("/api/measurements", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fromDate,
      toDate,
      chartType,
    }),
  });
  if (response.status === 401) {
    window.location.replace("login/?from=progress");
  }
  const measurements = await response.json();
  console.log("measurements", measurements);

  let tableHtml = "";
  for (const measurement of measurements) {
    const bodyFat = getBodyFat(
      measurement,
      customer.getAge(),
      customer.gender
    ).toFixed(2);
    tableHtml += `<tr>
    <td>${new Date(measurement.measureDate).toLocaleDateString("en-GB")}</td>
    <td>${measurement.weight}</td>
    <td>${measurement.height}</td>
    <td>${bodyFat}%</td>
  </tr>`;
  }
  const datatable = document.querySelector("tbody");
  if (!datatable.innerHTML.includes(tableHtml)) {
    datatable.innerHTML += tableHtml;
  }

  showChart(
    measurements.map((measurement) =>
      new Date(measurement.measureDate).toLocaleDateString("en-GB")
    ),
    chartType === "fat"
      ? [
          {
            label: titles[chartType],
            data: measurements.map((measurement) =>
              getBodyFat(measurement, customer.getAge(), customer.gender)
            ),
            borderWidth: 1,
          },
        ]
      : chartType === "weight"
      ? [
          {
            label: titles[chartType],
            data: measurements.map((measurement) => measurement.weight),
            borderWidth: 1,
          },
        ]
      : [
          {
            label: "היקף זרועות",
            data: measurements.map((measurement) => measurement.arms),
            borderWidth: 1,
          },
          {
            label: "היקף מותן",
            data: measurements.map((measurement) => measurement.waist),
            borderWidth: 1,
          },
          {
            label: "היקף חזה",
            data: measurements.map((measurement) => measurement.chest),
            borderWidth: 1,
          },
        ]
  );
};

let chart;
function showChart(labels, datasets) {
  if (chart) {
    chart.destroy();
  }
  const ctx = document.getElementById("myChart");
  ctx.style.display = "unset";

  chart = new Chart(ctx, {
    type: "line",
    data: {
      labels,
      datasets,
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}
