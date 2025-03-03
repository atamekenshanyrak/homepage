function showPopup(id) {
  const popup = document.getElementById(id + "-popup");
  popup.style.display = "flex";
  setTimeout(() => {
    popup.classList.add("active");
  }, 10);
  document.body.style.overflow = "hidden";
}

function hidePopup(id) {
  const popup = document.getElementById(id + "-popup");
  popup.classList.remove("active");
  setTimeout(() => {
    popup.style.display = "none";
    document.body.style.overflow = "";
  }, 300);
}

function toggleDropdown(element) {
  const dropdown = element.parentElement;

  if (dropdown.classList.contains("dropdown-open")) {
    dropdown.classList.remove("dropdown-open");
  } else {
    const section = dropdown.closest(".section-content");
    section.querySelectorAll(".dropdown-open").forEach((openDropdown) => {
      if (openDropdown !== dropdown) {
        openDropdown.classList.remove("dropdown-open");
      }
    });

    dropdown.classList.add("dropdown-open");
  }
}

function showDepartment(departmentId) {
  const departmentSections = document.querySelectorAll(".department-section");
  departmentSections.forEach((section) => {
    section.classList.remove("active");
  });

  const selectedSection = document.getElementById(departmentId);
  if (selectedSection) {
    selectedSection.classList.add("active");
  }

  const navDots = document.querySelectorAll(".departments-nav .nav-dot");
  navDots.forEach((dot) => {
    dot.classList.remove("active");
  });

  const activeDot = document.querySelector(
    `.departments-nav .nav-dot[onclick="showDepartment('${departmentId}')"]`
  );
  if (activeDot) {
    activeDot.classList.add("active");
  }
}

function launchConfetti() {
  const container = document.getElementById("confettiContainer");
  container.innerHTML = "";

  for (let i = 0; i < 150; i++) {
    createConfetti(container);
  }
}

function createConfetti(container) {
  const confetti = document.createElement("div");
  confetti.className = "confetti";

  const colors = [
    "#f44336",
    "#e91e63",
    "#9c27b0",
    "#673ab7",
    "#3f51b5",
    "#2196f3",
    "#03a9f4",
    "#00bcd4",
    "#009688",
    "#4caf50",
    "#8bc34a",
    "#cddc39",
    "#ffeb3b",
    "#ffc107",
    "#ff9800",
    "#ff5722",
  ];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];

  const isMobile = window.innerWidth <= 768;
  const size = isMobile ? Math.random() * 6 + 3 : Math.random() * 10 + 5;
  const photoElement = document.getElementById("curatorPhoto");
  const photoRect = photoElement.getBoundingClientRect();
  const containerRect = container.getBoundingClientRect();
  const centerX = photoRect.left + photoRect.width / 2 - containerRect.left;
  const centerY = photoRect.top + photoRect.height / 2 - containerRect.top;
  const startOffsetX = Math.random() * 40 - 20;
  const startOffsetY = Math.random() * 40 - 20;
  confetti.style.backgroundColor = randomColor;
  confetti.style.width = `${size}px`;
  confetti.style.height = `${size}px`;
  confetti.style.position = "absolute";
  confetti.style.left = `${centerX + startOffsetX}px`;
  confetti.style.top = `${centerY + startOffsetY}px`;

  const horizontalMove = (Math.random() * 2 - 1) * (isMobile ? 150 : 300);
  const verticalMove = (Math.random() * 2 - 1) * (isMobile ? 150 : 300);
  const keyframesName = `confetti-${Math.floor(Math.random() * 1000000)}`;
  const animationDuration = Math.random() * 2 + 1.5;
  const keyframes = `
    @keyframes ${keyframesName} {
      0% {
        transform: translate(0, 0);
        opacity: 1;
      }
      25% {
        transform: translate(${horizontalMove * 0.25}px, ${
    verticalMove * 0.25
  }px);
      }
      50% {
        transform: translate(${horizontalMove * 0.5}px, ${
    verticalMove * 0.5
  }px);
        opacity: 0.9;
      }
      75% {
        transform: translate(${horizontalMove * 0.75}px, ${
    verticalMove * 0.75
  }px);
        opacity: 0.6;
      }
      100% {
        transform: translate(${horizontalMove}px, ${verticalMove}px);
        opacity: 0;
      }
    }
  `;

  const styleElement = document.createElement("style");
  styleElement.textContent = keyframes;
  document.head.appendChild(styleElement);

  confetti.style.animation = `${keyframesName} ${animationDuration}s ease-out forwards`;

  const shape = Math.random();
  if (shape < 0.33) {
    confetti.style.borderRadius = "50%";
  } else if (shape < 0.66) {
    confetti.style.borderRadius = "0";
  } else {
    confetti.style.width = "0";
    confetti.style.height = "0";
    confetti.style.backgroundColor = "transparent";
    confetti.style.borderLeft = `${size / 2}px solid transparent`;
    confetti.style.borderRight = `${size / 2}px solid transparent`;
    confetti.style.borderBottom = `${size}px solid ${randomColor}`;
  }

  container.appendChild(confetti);
  setTimeout(() => {
    confetti.remove();
    styleElement.remove();
  }, animationDuration * 1000);
}

function clearAllConfetti() {
  const container = document.getElementById("confettiContainer");
  if (container) {
    container.innerHTML = "";
  }
}

function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

document.addEventListener("DOMContentLoaded", function () {
  const confettiContainer = document.getElementById("confettiContainer");
  if (confettiContainer) {
    confettiContainer.style.position = "absolute";
    confettiContainer.style.width = "100%";
    confettiContainer.style.height = "100%";
    confettiContainer.style.top = "0";
    confettiContainer.style.left = "0";
    confettiContainer.style.pointerEvents = "none";
    confettiContainer.style.zIndex = "1000";
  } else {
    const newConfettiContainer = document.createElement("div");
    newConfettiContainer.id = "confettiContainer";
    newConfettiContainer.style.position = "fixed";
    newConfettiContainer.style.width = "100%";
    newConfettiContainer.style.height = "100%";
    newConfettiContainer.style.top = "0";
    newConfettiContainer.style.left = "0";
    newConfettiContainer.style.pointerEvents = "none";
    newConfettiContainer.style.zIndex = "1000";
    document.body.appendChild(newConfettiContainer);
  }

  const curatorPhoto = document.getElementById("curatorPhoto");
  if (curatorPhoto) {
    curatorPhoto.addEventListener("click", function () {
      launchConfetti();
    });
  }

  document.querySelectorAll(".popup-overlay").forEach((overlay) => {
    overlay.addEventListener("click", function (e) {
      if (e.target === this) {
        const id = this.id.replace("-popup", "");
        hidePopup(id);
      }
    });
  });

  const targetDate = new Date("March 1, 2025 14:00:00 GMT+0500");

  const daysElement = document.getElementById("days");
  const hoursElement = document.getElementById("hours");
  const minutesElement = document.getElementById("minutes");
  const secondsElement = document.getElementById("seconds");
  const countdownContainer = document.querySelector(".countdown-container");
  const countdownTitle = document.querySelector(".countdown-title");

  let timerExpired = false;
  let randomNumberInterval;

  function updateRandomNumbers() {
    if (!timerExpired) return;

    daysElement.textContent = String(generateRandomNumber(0, 99)).padStart(
      2,
      "0"
    );
    hoursElement.textContent = String(generateRandomNumber(0, 99)).padStart(
      2,
      "0"
    );
    minutesElement.textContent = String(generateRandomNumber(0, 99)).padStart(
      2,
      "0"
    );
    secondsElement.textContent = String(generateRandomNumber(0, 99)).padStart(
      2,
      "0"
    );
  }

  function updateCountdown() {
    const currentDate = new Date();
    const timeDifference = targetDate - currentDate;

    if (timeDifference <= 0 || currentDate >= targetDate) {
      clearAllConfetti();

      if (!timerExpired) {
        timerExpired = true;

        randomNumberInterval = setInterval(updateRandomNumbers, 100);

        updateRandomNumbers();
      }

      if (countdownTitle) {
        countdownTitle.innerHTML =
          "<div>EXPO ATAMEKEN уже начался!</div><div>Спеши в Атриум второго этажа!</div>";
        countdownTitle.style.fontSize = "1.5rem";
        countdownTitle.style.lineHeight = "1.4";

        if (!document.querySelector(".countdown-container .more-info-btn")) {
          const buttonContainer = document.createElement("div");
          buttonContainer.style.marginTop = "20px";
          buttonContainer.innerHTML = `
            <button class="more-info-btn" onclick="showPopup('more-info')">
              Детективное дело
            </button>
          `;
          countdownContainer.appendChild(buttonContainer);
        }
      }
      return;
    }

    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor(
      (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    const formattedDays = String(days).padStart(2, "0");
    const formattedHours = String(hours).padStart(2, "0");
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");

    daysElement.textContent = formattedDays;
    hoursElement.textContent = formattedHours;
    minutesElement.textContent = formattedMinutes;
    secondsElement.textContent = formattedSeconds;
  }

  updateCountdown();

  const currentDate = new Date();
  if (currentDate >= targetDate) {
    updateCountdown();
  }

  setInterval(updateCountdown, 1000);
});

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    document.querySelectorAll(".popup-overlay.active").forEach((popup) => {
      const id = popup.id.replace("-popup", "");
      hidePopup(id);
    });
  }
});

window.addEventListener("resize", function () {
  if (
    document.getElementById("confettiContainer") &&
    document.getElementById("confettiContainer").children.length > 0
  ) {
    launchConfetti();
  }
});
