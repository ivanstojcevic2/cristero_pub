document.addEventListener("DOMContentLoaded", function () {
  const counters = [
    { target: 73, elementId: "counter1", interval: 50, addPlus: false },
    { target: 300, elementId: "counter2", interval: 10, addPlus: true },
    { target: 6, elementId: "counter3", interval: 200, addPlus: false },
  ];

  const observer = new IntersectionObserver(handleIntersection, {
    threshold: 0.5,
  });

  function handleIntersection(entries) {
    entries.forEach((entry) => {
      const counter = counters.find((c) => c.elementId === entry.target.id);

      if (entry.isIntersecting && counter && !entry.target.countStarted) {
        entry.target.countStarted = true;
        startCounting(counter);
      }
    });
  }

  function startCounting(counter) {
    const { target, elementId, interval, addPlus } = counter;
    const counterElement = document.getElementById(elementId);

    counterElement.style.opacity = 1;
    counterElement.style.transform = "translateY(0)";

    function updateCounter(i) {
      setTimeout(function () {
        if (addPlus && i === target) {
          counterElement.textContent = `${i}+`;
        } else {
          counterElement.textContent = i;
        }
      }, i * interval);
    }

    for (let i = 0; i <= target; i++) {
      updateCounter(i);
    }
  }

  counters.forEach((counter) => {
    const triggerElement = document.getElementById(counter.elementId);
    observer.observe(triggerElement);
  });
});
