(() => {
  const recipients = {
    styrelsen: "styrelsen@brfstationenhasselby.se",
    garage: "garage@brfstationenhasselby.se",
  };
  document.querySelectorAll("[data-contact-form]").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = new FormData(form);
      const address = recipients[data.get("recipient")];
      const subject = data.get("recipient") === "garage" ? "Meddelande om garage" : "Meddelande till styrelsen";
      const body = `Namn: ${data.get("name")}\nE-post: ${data.get("email")}\n\n${data.get("message")}`;
      window.location.href = `mailto:${address}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      const status = form.querySelector("[data-contact-status]");
      if (status) status.textContent = "Ditt mejlprogram öppnas med meddelandet ifyllt.";
    });
  });
})();
