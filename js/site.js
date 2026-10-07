(function () {

  var toggle = document.getElementById("menu-toggle");
  var panel = document.getElementById("mobile-nav");
  if (toggle && panel) {
    function setOpen(open) {
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      var lbl = toggle.querySelector(".menu-toggle__label");
      if (lbl) lbl.textContent = open ? (toggle.getAttribute("data-label-open") || "Close") : (toggle.getAttribute("data-label-closed") || "Pages");
      if (open) {
        panel.removeAttribute("hidden");
        document.body.classList.add("nav-open");
      } else {
        panel.setAttribute("hidden", "");
        document.body.classList.remove("nav-open");
      }
    }
    toggle.addEventListener("click", function () {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });
    panel.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { setOpen(false); });
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") { setOpen(false); toggle.focus(); }
    });
  }

  var el = document.getElementById("hours-today");
  var note = document.getElementById("hours-today-note");
  if (!el) return;
  try {
    var hours = JSON.parse(el.getAttribute("data-hours") || "[]");
    var dayName = new Intl.DateTimeFormat("en-CA", {
      weekday: "long", timeZone: "America/Toronto"
    }).format(new Date());
    var today = hours.find(function (h) { return h.day === dayName; });
    if (today) {
      el.textContent = today.closed ? "Closed today" : (dayName + ": " + today.display);
      if (note) note.textContent = el.getAttribute("data-note") || "";
    }
  } catch (err) {  }
})();
