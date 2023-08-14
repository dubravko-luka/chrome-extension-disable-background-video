document.addEventListener("DOMContentLoaded", function () {
  const switchButton = document.getElementById("off_light");

  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const tab = tabs[0];
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: checkIfIdExists
    });
  });

  switchButton.addEventListener("click", async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: toggleSwitch
    });

  });
});

function toggleSwitch() {
  const idExists = document.getElementById("turn-off-light");
  if (!idExists) {
    document.body.id = "turn-off-light"
  } else {
    document.body.id="";
  }
}

function checkIfIdExists() {
  const idExists = document.getElementById("turn-off-light");
  if (idExists) {
    chrome.runtime.sendMessage({ idExists: true });
  } else {
    chrome.runtime.sendMessage({ idExists: false });
  }
}

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.idExists) {
    document.getElementById("off_light").checked = true;
  } else {
    document.getElementById("off_light").checked = false;
  }
});