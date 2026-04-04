(function () {
  var storageKey = "galleriesdeluxe-theme-preference";
  var root = document.documentElement;
  var mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  var toggleContainer = document.querySelector(".theme-toggle");

  if (!toggleContainer) {
    return;
  }

  var getStoredPreference = function () {
    try {
      var storedPreference = window.localStorage.getItem(storageKey);
      if (storedPreference === "light" || storedPreference === "dark" || storedPreference === "system") {
        return storedPreference;
      }
    } catch (error) {}

    return "dark";
  };

  var resolveTheme = function (preference) {
    if (preference === "system") {
      return mediaQuery.matches ? "dark" : "light";
    }

    return preference;
  };

  var setTheme = function (preference) {
    var resolvedTheme = resolveTheme(preference);
    root.dataset.themePreference = preference;
    root.dataset.theme = resolvedTheme;
    root.style.colorScheme = resolvedTheme;

    var buttons = toggleContainer.querySelectorAll("[data-theme-choice]");
    buttons.forEach(function (button) {
      var isPressed = button.dataset.themeChoice === preference;
      button.setAttribute("aria-pressed", String(isPressed));
    });
  };

  var savePreference = function (preference) {
    try {
      window.localStorage.setItem(storageKey, preference);
    } catch (error) {}
  };

  var currentPreference = getStoredPreference();
  setTheme(currentPreference);

  toggleContainer.addEventListener("click", function (event) {
    var button = event.target.closest("[data-theme-choice]");
    if (!button) {
      return;
    }

    var preference = button.dataset.themeChoice;
    if (preference !== "light" && preference !== "dark" && preference !== "system") {
      return;
    }

    currentPreference = preference;
    savePreference(currentPreference);
    setTheme(currentPreference);
  });

  mediaQuery.addEventListener("change", function () {
    if (currentPreference === "system") {
      setTheme(currentPreference);
    }
  });
})();
