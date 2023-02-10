setTimeout(() => {
  const params = new URLSearchParams(window.location.search);
  const success = params.get("success");
  if (success) {
    alert("הטופס נשלח בהצלחה");
  }
}, 500);
