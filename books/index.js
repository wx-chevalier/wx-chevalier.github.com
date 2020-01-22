let bookContainer = document.querySelector(".search");
let searchBooks = document.getElementById("search-box");

/** @start 添加元素 */
[
  { id: "resource", title: "参考资料、书籍、视频、开源项目", icon: "" },
  { id: "pl", title: "编程语言", icon: "" },
  { id: "se", title: "数据结构、算法、软件架构", icon: "" },
  { id: "fe", title: "Web、大前端、可视化", icon: "" },
  { id: "be", title: "服务端、微服务、云原生", icon: "" },
  { id: "infras", title: "分布式系统、数据库、虚拟化", icon: "" },
  { id: "ai", title: "人工智能、机器学习、深度学习", icon: "" },
  { id: "product", title: "产品、运营、创业", icon: "" }
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

const getCover = title => {
  return `https://orly-appstore.herokuapp.com/generate?title=${title}&top_text=Just%20Coder&author=wx-chevalier&image_code=${randomIntFromInterval(
    1,
    40
  )}&theme=${randomIntFromInterval(
    0,
    16
  )}&guide_text=&guide_text_placement=bottom_right`;
};

/** 执行书籍抓取 */
const getBooks = async book => {
  let data = [];

  switch (book) {
    case "resource": {
      data = [
        {
          volumeInfo: {
            title: "CS 资料集锦",
            previewLink: "https://ng-tech.icu/Awesome-Lists",
            imageLinks: {
              thumbnail: "https://s2.ax1x.com/2020/01/18/19npPP.png"
            },
            categories: ["Awesome Lists"]
          }
        },
        {
          volumeInfo: {
            title: "速学速查手册",
            previewLink: "https://ng-tech.icu/Awesome-CheatSheets",
            imageLinks: {
              thumbnail: "https://s2.ax1x.com/2020/01/18/19nPxS.png"
            },
            categories: ["Awesome CheatSheets"]
          }
        },
        {
          volumeInfo: {
            title: "求职面试必备",
            previewLink: "https://ng-tech.icu/Awesome-Interviews",
            imageLinks: {
              thumbnail: "https://s2.ax1x.com/2020/01/18/19ne5q.png"
            },
            categories: ["Awesome Interviews"]
          }
        },
        {
          volumeInfo: {
            title: "程序员进阶指南",
            previewLink: "https://ng-tech.icu/Awesome-RoadMaps",
            imageLinks: {
              thumbnail: "https://s2.ax1x.com/2020/01/18/19n1r4.png"
            },
            categories: ["Awesome RoadMaps"]
          }
        },
        {
          volumeInfo: {
            title: "知识脉络思维脑图",
            previewLink: "https://ng-tech.icu/Awesome-MindMaps",
            imageLinks: {
              thumbnail: "https://s2.ax1x.com/2020/01/18/19naRK.png"
            },
            categories: ["Awesome MindMaps"]
          }
        },
        {
          volumeInfo: {
            title: "开源书籍（.pdf）汇总",
            previewLink: "https://github.com/wx-chevalier/Awesome-CS-Books",
            imageLinks: {
              thumbnail: "https://s2.ax1x.com/2020/01/18/19nBse.png"
            },
            categories: ["Awesome CS-Books"]
          }
        }
      ];
      break;
    }
    case "pl": {
      data = [
        {
          volumeInfo: {
            title: "Java 实战",
            previewLink: "https://ng-tech.icu/Java-Series/#/",
            imageLinks: {
              thumbnail: getCover("Java Series")
            },
            categories: ["Java", "Spring"]
          }
        },
        {
          volumeInfo: {
            title: "JavaScript 实战",
            previewLink: "https://ng-tech.icu/JavaScript-Series/#/",
            imageLinks: {
              thumbnail: getCover("JavaScript Series")
            },
            categories: ["JavaScript"]
          }
        },
        {
          volumeInfo: {
            title: "Python 实战",
            previewLink: "https://ng-tech.icu/ProgrammingLanguage-Series/#/",
            imageLinks: {
              thumbnail: getCover("Python Series")
            },
            categories: ["Python"]
          }
        },
        {
          volumeInfo: {
            title: "Go 实战",
            previewLink: "https://ng-tech.icu/Go-Series/#/",
            imageLinks: {
              thumbnail: getCover("Go Series")
            },
            categories: ["Go"]
          }
        },
        {
          volumeInfo: {
            title: "Rust 实战",
            previewLink: "https://ng-tech.icu/ProgrammingLanguage-Series/#/",
            imageLinks: {
              thumbnail: getCover("Rust Series")
            },
            categories: ["Rust"]
          }
        }
      ];
      break;
    }
    case "se": {
      data = [
        {
          volumeInfo: {
            title: "编程范式与设计模式",
            previewLink: "https://ng-tech.icu/DesignPattern-Series/",
            imageLinks: {
              thumbnail: getCover("Design Patterns")
            },
            categories: ["Design Patterns"]
          }
        },
        {
          volumeInfo: {
            title: "数据结构与算法",
            previewLink: "https://ng-tech.icu/AlgoDS-Series/",
            imageLinks: {
              thumbnail: getCover("Algorithm & DataStructure")
            },
            categories: ["Data Structure", "Algorithm"]
          }
        },
        {
          volumeInfo: {
            title: "软件架构设计",
            previewLink: "https://ng-tech.icu/SoftwareArchitecture-Series/",
            imageLinks: {
              thumbnail: getCover("Software Architecture")
            },
            categories: ["Software Architecture"]
          }
        },
        {
          volumeInfo: {
            title: "整洁与重构",
            previewLink: "https://ng-tech.icu/SoftwareEngineering-Series/",
            imageLinks: {
              thumbnail: getCover("Refactor")
            },
            categories: ["Refactor"]
          }
        }
      ];
      break;
    }
    case "fe": {
      data = [
        {
          volumeInfo: {
            title: "现代 Web 全栈开发与工程架构",
            previewLink: "https://ng-tech.icu/Web-Series/",
            imageLinks: {
              thumbnail: getCover("Web Series")
            },
            categories: ["Web", "React", "Vue"]
          }
        },
        {
          volumeInfo: {
            title: "数据可视化",
            previewLink: "https://ng-tech.icu/Frontend-Series/",
            imageLinks: {
              thumbnail: getCover("Data Visualization")
            },
            categories: ["DataVis"]
          }
        },
        {
          volumeInfo: {
            title: "Node.js 全栈开发",
            previewLink: "https://ng-tech.icu/Node-Series/",
            imageLinks: {
              thumbnail: getCover("Node Series")
            },
            categories: ["Node"]
          }
        },
        {
          volumeInfo: {
            title: "iOS",
            previewLink: "https://ng-tech.icu/Frontend-Series/",
            imageLinks: {
              thumbnail: getCover("iOS")
            },
            categories: ["iOS"]
          }
        },
        {
          volumeInfo: {
            title: "Android",
            previewLink: "https://ng-tech.icu/Frontend-Series/",
            imageLinks: {
              thumbnail: getCover("Android")
            },
            categories: ["Android"]
          }
        },
        {
          volumeInfo: {
            title: "混合开发与跨端应用",
            previewLink: "https://ng-tech.icu/Frontend-Series/",
            imageLinks: {
              thumbnail: getCover("Hybrid")
            },
            categories: ["Hybrid"]
          }
        }
      ];
      break;
    }
    case "be": {
      data = [
        {
          volumeInfo: {
            title: "服务端功能域",
            previewLink: "https://ng-tech.icu/Backend-Series/",
            imageLinks: {
              thumbnail: getCover("Backend Series")
            },
            categories: ["Backend"]
          }
        },
        {
          volumeInfo: {
            title: "微服务与云原生",
            previewLink: "https://ng-tech.icu/MicroService-Series/",
            imageLinks: {
              thumbnail: getCover("MicroService Series")
            },
            categories: ["Backend", "MicroService"]
          }
        },
        {
          volumeInfo: {
            title: "Spring 实战",
            previewLink: "https://ng-tech.icu/Spring-Series/",
            imageLinks: {
              thumbnail: getCover("Spring Series")
            },
            categories: ["Backend", "Spring"]
          }
        },
        {
          volumeInfo: {
            title: "测试与高可用保障",
            previewLink: "https://ng-tech.icu/Backend-Series/",
            imageLinks: {
              thumbnail: getCover("Test Series")
            },
            categories: ["Backend", "Test"]
          }
        },
        {
          volumeInfo: {
            title: "DevOps 实战",
            previewLink: "https://ng-tech.icu/Backend-Series/",
            imageLinks: {
              thumbnail: getCover("DevOps Series")
            },
            categories: ["Backend", "DevOps"]
          }
        },
        {
          volumeInfo: {
            title: "信息安全与渗透测试",
            previewLink: "https://ng-tech.icu/Backend-Series/",
            imageLinks: {
              thumbnail: getCover("InfoSecurity Series")
            },
            categories: ["Backend", "InfoSecurity"]
          }
        }
      ];
      break;
    }
    case "infras": {
      data = [
        {
          volumeInfo: {
            title: "分布式系统",
            previewLink: "https://ng-tech.icu/DistributedSystem-Series/#/",
            imageLinks: {
              thumbnail: getCover("Distributed System Series")
            },
            categories: ["Backend", "Distributed System"]
          }
        },
        {
          volumeInfo: {
            title: "分布式计算",
            previewLink: "https://ng-tech.icu/DistributedSystem-Series/#/",
            imageLinks: {
              thumbnail: getCover("Distributed Computing Series")
            },
            categories: ["Backend", "Distributed Computing"]
          }
        },
        {
          volumeInfo: {
            title: "数据库",
            previewLink: "https://ng-tech.icu/Database-Series/#/",
            imageLinks: {
              thumbnail: getCover("Database Series")
            },
            categories: ["Backend", "Database"]
          }
        },
        {
          volumeInfo: {
            title: "网络",
            previewLink: "https://ng-tech.icu/Network-Series/#/",
            imageLinks: {
              thumbnail: getCover("Network Series")
            },
            categories: ["Backend", "Network"]
          }
        },
        {
          volumeInfo: {
            title: "虚拟化与云计算",
            previewLink: "https://ng-tech.icu/Cloud-Series/#/",
            imageLinks: {
              thumbnail: getCover("Cloud Series")
            },
            categories: ["Backend", "Cloud"]
          }
        },
        {
          volumeInfo: {
            title: "Linux 与操作系统",
            previewLink: "https://ng-tech.icu/Linux-Series/#/",
            imageLinks: {
              thumbnail: getCover("Linux Series")
            },
            categories: ["Backend", "Linux"]
          }
        }
      ];
      break;
    }
    case "ai": {
      data = [
        {
          volumeInfo: {
            title: "数理统计",
            previewLink: "https://ng-tech.icu/Mathematics-Series/#/",
            imageLinks: {
              thumbnail: getCover("Mathematics Series")
            },
            categories: ["AI", "Mathematics"]
          }
        },
        {
          volumeInfo: {
            title: "数据分析",
            previewLink: "https://ng-tech.icu/AI-Series/#/",
            imageLinks: {
              thumbnail: getCover("Data Series")
            },
            categories: ["AI", "Data"]
          }
        },
        {
          volumeInfo: {
            title: "机器学习",
            previewLink: "https://ng-tech.icu/AI-Series/#/",
            imageLinks: {
              thumbnail: getCover("Machine Learning Series")
            },
            categories: ["AI", "Machine Learning"]
          }
        },
        {
          volumeInfo: {
            title: "深度学习",
            previewLink: "https://ng-tech.icu/AI-Series/#/",
            imageLinks: {
              thumbnail: getCover("Deep Learning Series")
            },
            categories: ["AI", "Deep Learning"]
          }
        },
        {
          volumeInfo: {
            title: "自然语言处理",
            previewLink: "https://ng-tech.icu/AI-Series/#/",
            imageLinks: {
              thumbnail: getCover("NLP Series")
            },
            categories: ["AI", "NLP"]
          }
        }
      ];
      break;
    }
    case "product": {
      data = [
        {
          volumeInfo: {
            title: "产品设计",
            previewLink: "https://ng-tech.icu/Product-Series/#/",
            imageLinks: {
              thumbnail: getCover("Product Series")
            },
            categories: ["Product Series"]
          }
        },
        {
          volumeInfo: {
            title: "行业迷思",
            previewLink: "https://ng-tech.icu/Business-Series/#/",
            imageLinks: {
              thumbnail: getCover("Business Series")
            },
            categories: ["Business Series"]
          }
        }
      ];
      break;
    }
  }

  data.forEach(d => {
    d.volumeInfo.authors = ["月熊"];
  });

  return { totalItems: data.length, items: data };
};

const drawChartBook = async (subject, startIndex = 0) => {
  let cbookContainer = document.querySelector(`.${subject}`);
  cbookContainer.innerHTML = `<div class='prompt'><div class="loader"></div></div>`;
  const cdata = await getBooks(subject);
  if (cdata.error) {
    cbookContainer.innerHTML = `<div class='prompt'>ツ Limit exceeded! Try after some time</div>`;
  } else if (cdata.totalItems == 0) {
    cbookContainer.innerHTML = `<div class='prompt'>ツ No results, try a different term!</div>`;
  } else if (cdata.totalItems == undefined) {
    cbookContainer.innerHTML = `<div class='prompt'>ツ Network problem!</div>`;
  } else {
    cbookContainer.innerHTML = cdata.items;
    cbookContainer.innerHTML = cdata.items
      .map(
        ({ volumeInfo }) =>
          `<div class='book' style='background: linear-gradient(` +
          getRandomColor() +
          `, rgba(0, 0, 0, 0));'><a href='${volumeInfo.previewLink}' target='_blank'><img class='thumbnail' src='` +
          (volumeInfo.imageLinks.thumbnail === undefined
            ? "icons/logo.svg"
            : volumeInfo.imageLinks.thumbnail.replace("http://", "https://")) +
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
};
const drawListBook = async () => {
  if (searchBooks.value != "") {
    bookContainer.style.display = "flex";
    bookContainer.innerHTML = `<div class='prompt'><div class="loader"></div></div>`;
    const data = await getBooks(`${searchBooks.value}&maxResults=6`);
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
