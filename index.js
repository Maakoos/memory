class Memory {
  constructor() {
    this.imagesArray = [
      "element1.png",
      "element2.png",
      "element3.png",
      "element4.png",
      "element5.png",
      "element6.png",
      "element7.png",
      "element8.png",
      "element9.png",
      "element10.png",
    ];

    this.boxWrapper = null;
    this.elemetns = null;

    this.firstElement = null;
    this.secondElement = null;

    this.chooseMode = false;
    this.blockClick = false;

    this.winMessage = null;
    this.playAgainBtn = null;

    this.uiSelectors = {
      boxWrapper: "[data-wrapper]",
      element: "[data-element]",
      winMessage: "[data-winMessage]",
      playAgainBtn: "[data-playAgainBtn]",
    };
  }

  initializeGame() {
    this.boxWrapper = document.querySelector(this.uiSelectors.boxWrapper);
    this.winMessage = document.querySelector(this.uiSelectors.winMessage);
    this.playAgainBtn = document.querySelector(this.uiSelectors.playAgainBtn);

    this.createBoxes();
    this.elemetns = document.querySelectorAll(this.uiSelectors.element);
    this.addEventToElements();
  }

  createBoxes() {
    const copyImagesArray = [...this.imagesArray, ...this.imagesArray];
    const randomArrangementImages = [];

    while (copyImagesArray.length) {
      const index = Math.floor(Math.random() * copyImagesArray.length);
      const randomElement = copyImagesArray.splice(index, 1);
      randomArrangementImages.push(...randomElement);
    }

    randomArrangementImages.forEach((img) => {
      this.boxWrapper.insertAdjacentHTML(
        "beforeend",
        `<div class="element" data-element>
          <img src="./img/${img}" alt="${img}" class="image">
        </div>`
      );
    });
  }

  addEventToElements() {
    this.elemetns.forEach((element) =>
      element.addEventListener("click", (e) => this.getImg(e))
    );

    this.playAgainBtn.addEventListener("click", () => this.playAgain());
  }

  getImg(e) {
    if (e.target.classList.contains("showImage")) return;

    if (!this.blockClick) {
      e.target.classList.add("showImage");

      if (this.firstElement === null) {
        this.firstElement = e.target;
      }

      if (this.chooseMode) {
        this.secondElement = e.target;
        this.chooseMode = false;
      }

      this.chooseMode = true;

      if (this.firstElement && this.secondElement) {
        this.checkElements();
        this.chooseMode = false;
        this.blockClick = true;
        setTimeout(() => {
          this.blockClick = false;
        }, 1000);
      }
    }
  }

  checkElements() {
    if (this.firstElement.src === this.secondElement.src) {
      setTimeout(() => this.hideElements(), 500);
    } else {
      setTimeout(() => {
        this.firstElement.classList.remove("showImage");
        this.secondElement.classList.remove("showImage");
        this.resetElementsValue();
      }, 500);
    }
  }

  hideElements() {
    this.firstElement.parentNode.classList.add("offElement");
    this.secondElement.parentNode.classList.add("offElement");
    this.resetElementsValue();

    const checkIfWin = [...this.elemetns].every((element) =>
      element.classList.contains("offElement")
    );
    if (checkIfWin) {
      this.showWinMessage();
    }
  }

  resetElementsValue() {
    this.firstElement = null;
    this.secondElement = null;
  }

  showWinMessage() {
    this.winMessage.classList.add("showWinMessage");
  }

  playAgain() {
    this.boxWrapper.innerHTML = "";

    this.createBoxes();
    this.elemetns = document.querySelectorAll(this.uiSelectors.element);
    this.addEventToElements();
    this.resetElementsValue();

    this.winMessage.classList.remove("showWinMessage");
  }
}
