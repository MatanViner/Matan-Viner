const userJson = localStorage.getItem("currentUser");
if (!userJson) {
  window.location.replace("/views/login.html?from=progress");
}

const fromDate = document.getElementById("startDate")?.value;
const toDate = document.getElementById("endDate")?.value;

const overlayHTML = '<div class="overlaye"><h1>התהליך שלי</h1></div>';
const overlay = document.createElement("div");
overlay.innerHTML = overlayHTML;
header.appendChild(overlay);

const titles = {
  fat: "אחוז שומן",
  weight: "משקל בקילוגרם",
  circumference: "היקפי גוף",
};

document.getElementById("showChart").onclick = function (e) {
  e.preventDefault();
  const chartType = document.getElementById("chartType").value;
  if (chartType === "unchoosed") {
    errorMsg("אנא בחר פרמטר להצגה.");
    return;
  }
  const user = JSON.parse(userJson);
  const customer = new Customer(user);
  document.getElementById("measurementsTable").style.visibility = "visible";

  let measurements = [...customer.measurements];
  if (fromDate) {
    measurements = measurements.filter(
      (m) => new Date(m.date).getTime() >= new Date(fromDate).getTime()
    );
  }
  if (toDate) {
    measurements = measurements.filter(
      (m) => new Date(m.date).getTime() <= new Date(toDate).getTime()
    );
  }

  let tableHtml = "";
  for (const measurement of measurements) {
    tableHtml += `<tr>
    <td>${new Date(measurement.date).toLocaleDateString("en-GB")}</td>
    <td>${measurement.weight}</td>
    <td>${measurement.height}</td>
    <td>${getBodyFat(measurement, customer.getAge(), customer.gender).toFixed(
      2
    )}%</td>
  </tr>`;
  }

  document.querySelector("tbody").innerHTML += tableHtml;

  showChart(
    measurements.map((measurement) =>
      new Date(measurement.date).toLocaleDateString("en-GB")
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
            data: customer.measurements.map((measurement) => measurement.waist),
            borderWidth: 1,
          },
          {
            label: "היקף חזה",
            data: customer.measurements.map((measurement) => measurement.chest),
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
