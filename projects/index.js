let bookContainer = document.querySelector(".search");
let searchBooks = document.getElementById("search-box");

/** @start 添加元素 */
[
  { id: "dev-snippets", title: "Dev Snippets | 代码片段", icon: "" },
  { id: "fe-kits", title: "FE Kits | 大前端与 Web", icon: "" },
  { id: "be-kits", title: "BE Kits | 服务端架构", icon: "" },
  { id: "ai-kits", title: "AI Kits | 智能算法", icon: "" }
].forEach(({ id, title, icon }) => {
  document.addEventListener("DOMContentLoaded", () => {
    drawChartBook(id);
  });

  document.querySelector("#foryou").innerHTML =
    document.querySelector("#foryou").innerHTML +
    `
      <section id=${id} class="results">
        <div class="flex">
          <h1 class="section-title">${title}</h1>
          <div>
            <button id="${id}-prev" class="pagination prev" onclick="prev('${id}')">◀</button>
            <button id="${id}-next" class="pagination next" onclick="next('${id}')">▶</button>
          </div>
        </div>
        <div class="list-book ${id} categories">
          <div class='prompt'>
            <div class="loader"></div>
          </div>
        </div>
        <div class="fade left"></div>
        <div class="fade right"></div>
      </section>
  `;
});

/** @end 添加元素 */

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/** 执行书籍抓取 */
const getProjects = async book => {
  let data = [];

  switch (book) {
    case "dev-snippets": {
      data = [
        // Dev Snippets
        { user: "Dev-Snippets", repo: "algorithm-snippets" },
        { user: "Dev-Snippets", repo: "js-snippets" },
        { user: "Dev-Snippets", repo: "design-pattern-snippets" },
        { user: "Dev-Snippets", repo: "java-snippets" },
        { user: "Dev-Snippets", repo: "go-snippets" },
        { user: "Dev-Snippets", repo: "shell-scripts" },
        { user: "Dev-Snippets", repo: "schema-hub-ts" },
        { user: "Dev-Snippets", repo: "python-snippets" },
        { user: "Dev-Snippets", repo: "data-vis-snippets" },
        { user: "Dev-Snippets", repo: "coding-snippets" },
        { user: "Dev-Snippets", repo: "plt-snippets" },
        { user: "Dev-Snippets", repo: "vscode-snippets" },
        { user: "Dev-Snippets", repo: "vscode-google-java-format-provider" }
      ];
      break;
    }
    case "fe-kits": {
      data = [
        // FE Kits
        { user: "FE-Kits", repo: "fe-boilerplates" },
        { user: "FE-Kits", repo: "legoble" },
        { user: "FE-Kits", repo: "fractal-components" },
        { user: "FE-Kits", repo: "m-fe-taro" },
        { user: "FE-Kits", repo: "m-fe-configs" },
        { user: "FE-Kits", repo: "m-fe-vtw" },
        { user: "FE-Kits", repo: "m-fe-scaffold" },
        { user: "FE-Kits", repo: "m-fe-rtw" },
        { user: "FE-Kits", repo: "m-fe-libs" },
        { user: "FE-Kits", repo: "m-fe-ssr" },
        { user: "FE-Kits", repo: "m-fe-rm" },
        { user: "FE-Kits", repo: "ueact" },
        { user: "FE-Kits", repo: "ueme" },
        { user: "FE-Kits", repo: "ueme-replay" },
        { user: "FE-Kits", repo: "web-whiteboard" },
        { user: "FE-Kits", repo: "uvc-live" },
        { user: "FE-Kits", repo: "react-examples" },
        { user: "FE-Kits", repo: "web-examples" },
        { user: "FE-Kits", repo: "vue-examples" },
        { user: "FE-Kits", repo: "node-examples" },
        { user: "FE-Kits", repo: "nest-realworld-app" },
        { user: "FE-Kits", repo: "redux-middlewares" },
        { user: "FE-Kits", repo: "stl-tools" },
        { user: "FE-Kits", repo: "xiddler" },
        { user: "FE-Kits", repo: "AJER" },
        { user: "FE-Kits", repo: "iotable" }
      ];
      break;
    }
    case "be-kits": {
      data = [
        { user: "BE-Kits", repo: "horus-monitor" },
        { user: "BE-Kits", repo: "k8s-examples" },
        { user: "BE-Kits", repo: "sql-examples" },
        { user: "BE-Kits", repo: "ioredisson" },
        { user: "BE-Kits", repo: "Reinvent-Cloud-Native-Mall" },
        { user: "BE-Kits", repo: "spring-examples" },
        { user: "BE-Kits", repo: "grpc-examples" },
        { user: "BE-Kits", repo: "devops-scripts" },
        { user: "BE-Kits", repo: "Reinvent-DB" },
        { user: "BE-Kits", repo: "UDLA" },
        { user: "BE-Kits", repo: "Backend-Boilerplates" },
        { user: "BE-Kits", repo: "mushi-chat" },
        { user: "BE-Kits", repo: "xe-crawler" },
        { user: "BE-Kits", repo: "Data-Fabric" },
        { user: "BE-Kits", repo: "MEMI-Schema" },
        { user: "BE-Kits", repo: "Cendertron" },
        { user: "BE-Kits", repo: "Chaos-Scanner" },
        { user: "BE-Kits", repo: "go-utils" },
        { user: "BE-Kits", repo: "Reinvent-SSO" },
        { user: "BE-Kits", repo: "Reinvent-RPC" },
        { user: "BE-Kits", repo: "Reinvent-MQ" },
        { user: "BE-Kits", repo: "SparkChain" },
        { user: "BE-Kits", repo: "MEMI-I18n" },
        { user: "BE-Kits", repo: "Focker" },
        { user: "BE-Kits", repo: "winter-boot" }
      ];
      break;
    }
    case "ai-kits": {
      data = [];
      break;
    }
  }

  return { totalItems: data.length, items: data };
};

const drawChartBook = async (subject, startIndex = 0) => {
  let cbookContainer = document.querySelector(`.${subject}`);

  cbookContainer.innerHTML = `<div class='prompt'><div class="loader"></div></div>`;

  const cdata = await getProjects(subject);

  cbookContainer.innerHTML = cdata.items;
  cbookContainer.innerHTML = cdata.items
    .map(
      ({ user, repo }) =>
        `<div class="repo"><a href="https://github.com/${user}/${repo}"><img src="https://gh-card.dev/repos/${user}/${repo}.svg"></a></div>`
    )
    .join("");

  if (window.drawWidgets) {
    window.drawWidgets(document);
  }
};

const drawListBook = async () => {
  if (searchBooks.value != "") {
    bookContainer.style.display = "flex";
    bookContainer.innerHTML = `<div class='prompt'><div class="loader"></div></div>`;
    const data = await getProjects(`${searchBooks.value}&maxResults=6`);
    if (data.error) {
      bookContainer.innerHTML = `<div class='prompt'>ツ Limit exceeded! Try after some time</div>`;
    } else if (data.totalItems == 0) {
      bookContainer.innerHTML = `<div class='prompt'>ツ No results, try a different term!</div>`;
    } else if (data.totalItems == undefined) {
      bookContainer.innerHTML = `<div class='prompt'>ツ Network problem!</div>`;
    } else {
      bookContainer.innerHTML = data.items
        .map(
          ({ volumeInfo }) =>
            `<div class='book' style='background: linear-gradient(` +
            getRandomColor() +
            `, rgba(0, 0, 0, 0));'><a href='${volumeInfo.previewLink}' target='_blank'><img class='thumbnail' src='` +
            (volumeInfo.imageLinks.thumbnail === undefined
              ? "icons/logo.svg"
              : volumeInfo.imageLinks.thumbnail.replace(
                  "http://",
                  "https://"
                )) +
            `' alt='cover'></a><div class='book-info'><h3 class='book-title'><a href='${volumeInfo.previewLink}' target='_blank'>${volumeInfo.title}</a></h3><div class='book-authors' onclick='updateFilter(this,"author");'>${volumeInfo.authors}</div><div class='info' onclick='updateFilter(this,"subject");' style='background-color: ` +
            getRandomColor() +
            `;'>` +
            (volumeInfo.categories === undefined
              ? "Others"
              : volumeInfo.categories) +
            `</div></div></div>`
        )
        .join("");
    }
  } else {
    bookContainer.style.display = "none";
  }
};
const updateFilter = ({ innerHTML }, f) => {
  document.getElementById("main").scrollIntoView({
    behavior: "smooth"
  });
  let m;
  switch (f) {
    case "author":
      m = "inauthor:";
      break;
    case "subject":
      m = "subject:";
      break;
  }
  searchBooks.value = m + innerHTML;
  debounce(drawListBook, 1000);
};
const debounce = (fn, time, to = 0) => {
  to ? clearTimeout(to) : (to = setTimeout(drawListBook, time));
};
searchBooks.addEventListener("input", () => debounce(drawListBook, 1000));

let mainNavLinks = document.querySelectorAll(".scrolltoview");
window.addEventListener("scroll", event => {
  let fromTop = window.scrollY + 64;
  mainNavLinks.forEach(({ hash, classList }) => {
    if (!hash) {
      return;
    }

    let section = document.querySelector(hash);

    if (
      section.offsetTop <= fromTop &&
      section.offsetTop + section.offsetHeight > fromTop
    ) {
      classList.add("current");
    } else {
      classList.remove("current");
    }
  });
});
const getRandomColor = () =>
  `#${Math.floor(Math.random() * 16777215).toString(16)}40`;
const toggleSwitch = document.querySelector(
  '.theme-switch input[type="checkbox"]'
);
if (localStorage.getItem("marcdownTheme") == "dark") {
  document.documentElement.setAttribute("data-theme", "dark");
  document
    .querySelector("meta[name=theme-color]")
    .setAttribute("content", "#090b28");
  toggleSwitch.checked = true;
  localStorage.setItem("marcdownTheme", "dark");
} else {
  document.documentElement.setAttribute("data-theme", "light");
  document
    .querySelector("meta[name=theme-color]")
    .setAttribute("content", "#ffffff");
  toggleSwitch.checked = false;
  localStorage.setItem("marcdownTheme", "light");
}
const switchTheme = ({ target }) => {
  if (target.checked) {
    document.documentElement.setAttribute("data-theme", "dark");
    document
      .querySelector("meta[name=theme-color]")
      .setAttribute("content", "#090b28");
    localStorage.setItem("marcdownTheme", "dark");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    document
      .querySelector("meta[name=theme-color]")
      .setAttribute("content", "#ffffff");
    localStorage.setItem("marcdownTheme", "light");
  }
};
toggleSwitch.addEventListener("change", switchTheme, false);
let startIndex = 0;
const next = subject => {
  startIndex += 6;
  if (startIndex >= 0) {
    document.getElementById(`${subject}-prev`).style.display = "inline-flex";
    drawChartBook(subject, startIndex);
  } else {
    document.getElementById(`${subject}-prev`).style.display = "none";
  }
};
const prev = subject => {
  startIndex -= 6;
  if (startIndex <= 0) {
    startIndex = 0;
    drawChartBook(subject, startIndex);
    document.getElementById(`${subject}-prev`).style.display = "none";
  } else {
    document.getElementById(`${subject}-prev`).style.display = "inline-flex";
    drawChartBook(subject, startIndex);
  }
};

let pwaInstalled = localStorage.getItem("pwaInstalled") == "yes";
if (window.matchMedia("(display-mode: standalone)").matches) {
  localStorage.setItem("pwaInstalled", "yes");
  pwaInstalled = true;
}
if (window.navigator.standalone === true) {
  localStorage.setItem("pwaInstalled", "yes");
  pwaInstalled = true;
}
if (pwaInstalled) {
  document.getElementById("installPWA").style.display = "none";
} else {
  document.getElementById("installPWA").style.display = "inline-flex";
}
let deferredPrompt = null;
window.addEventListener("beforeinstallprompt", e => {
  deferredPrompt = e;
});
async function installPWA() {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then(({ outcome }) => {
      if (outcome === "accepted") {
        console.log("Your PWA has been installed");
      } else {
        console.log("User chose to not install your PWA");
      }
      deferredPrompt = null;
    });
  }
}
window.addEventListener("appinstalled", evt => {
  localStorage.setItem("pwaInstalled", "yes");
  pwaInstalled = true;
  document.getElementById("installPWA").style.display = "none";
});
