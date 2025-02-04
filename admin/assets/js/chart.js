const ctx = document.getElementById('myChart');
const earning = document.getElementById('earning');

// Fetch data from the server
fetch('/AutoMobile Project/admin/functions/get_dashboard_data.php')
  .then(response => response.json())
  .then(data => {
    // Doughnut chart data
    const appointmentLabels = Object.keys(data.appointments);
    const appointmentData = Object.values(data.appointments);

    const myChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: appointmentLabels,
        datasets: [{
          label: 'Number of Appointments',
          data: appointmentData,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 99, 132, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(255, 99, 132, 1)',
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
      }
    });

    // Line chart data
    const invoiceLabels = Object.keys(data.invoices);
    const invoiceData = Object.values(data.invoices);

    new Chart(earning, {
      type: 'line',
      data: {
        labels: invoiceLabels,
        datasets: [{
          label: 'Earnings',
          data: invoiceData,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
      }
    });
  })
  .catch(error => console.error('Error fetching data:', error));
