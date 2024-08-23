document.addEventListener('DOMContentLoaded', () => {
  //optins de cartes
  const cards = [
    {
      name: 'Dardevil',
      img: 'img/Dardevil.jpg'
    },
    {
      name: 'DrStrange',
      img: 'img/DrStrange.jpg'
    },
    {
      name: 'GhostRider',
      img: 'img/GhostRider.jpg'
    },
    {
      name: 'Hulk',
      img: 'img/Hulk.jpg'
    },
    {
      name: 'Spiderman',
      img: 'img/Spiderman.jpg'
    },
    {
      name: 'Thor',
      img: 'img/Thor.jpg'
    },
    {
      name: 'Vision',
      img: 'img/Vision.jpg'
    },
    {
      name: 'Dardevil',
      img: 'img/Dardevil.jpg'
    },
    {
      name: 'DrStrange',
      img: 'img/DrStrange.jpg'
    },
    {
      name: 'GhostRider',
      img: 'img/GhostRider.jpg'
    },
    {
      name: 'Hulk',
      img: 'img/Hulk.jpg'
    },
    {
      name: 'Spiderman',
      img: 'img/Spiderman.jpg'
    },
    {
      name: 'Thor',
      img: 'img/Thor.jpg'
    },
    {
      name: 'Vision',
      img: 'img/Vision.jpg'
    }
  ]

  // Cree une nouvelle ordenacion des cartes
  cards.sort(() => 0.5 - Math.random());

  // cree les element pour faire les operations
  const board = document.querySelector('.board');
  const resultView = document.querySelector('#result');

  // 3 tableau pour sauvegarder les info
  let cardsChosen = []; // les items que vous avez choisi
  let cardsChosenId = []; //ids des cartes que vous choisi avec un cliquez (obs: verifie se c'est la meme image sur le clique)
  let cardsWon = []; //cartes que sont combinée

  //Lire le tableau e cree les items dans le html
  function createBoard() {
    for (let i = 0; i < cards.length; i++) {
      const card = document.createElement('img');
      card.classList.add('carteverse');
      card.setAttribute('src', 'img/Card.jpg');
      card.setAttribute('data-id', i);
      card.addEventListener('click', flipCard);
      board.appendChild(card);
    }
  }

  //function pour voir des combinations possibles
  function checkForMatch() {
    const cards = document.querySelectorAll('img');
    const optionOneId = cardsChosenId[0];
    const optionTwoId = cardsChosenId[1];
    
    //verifie se vous avez cliquez sur la meme image 2 fois
    if(optionOneId == optionTwoId) {
      cards[optionOneId].setAttribute('src', 'img/Card.jpg');
      cards[optionTwoId].setAttribute('src', 'img/Card.jpg');
      // openModal(dialog)
      Toastify({
        text: "Vous avez clique sur la meme image!",
        close: true,
        duration: 3000
        }).showToast();
      // alert('Vous avez clique sur la meme image!');
    }

    //verifie se vous avez cliquez sur les images diferents
    else if (cardsChosen[0] === cardsChosen[1]) {
      // openModal(dialog)
      Toastify({
        text: "Bravo, vous avez reussi une combinacion",
        close: true,
        duration: 3000
        }).showToast();
      // alert('Bravo, vous avez reussi une combinacion!');
      cards[optionOneId].setAttribute('src', 'img/check.png');
      cards[optionTwoId].setAttribute('src', 'img/check.png');
      cards[optionOneId].removeEventListener('click', flipCard);
      cards[optionTwoId].removeEventListener('click', flipCard);
      cardsWon.push(cardsChosen);
      resultView.textContent = 'Paires trouvée: '+cardsWon.length;
    } else {
      cards[optionOneId].setAttribute('src', 'img/Card.jpg');
      cards[optionTwoId].setAttribute('src', 'img/Card.jpg');
      // openModal(dialog)
      Toastify({
        text: "Ops, essayer à nouveau!",
        close: true,
        duration: 3000
        }).showToast();
      // alert('Ops, essayer à nouveau!');
    }
    cardsChosen = [];
    cardsChosenId = [];
    //ajouter les points au placar
    resultView.textContent = 'Paires trouvée: '+cardsWon.length;
    if  (cardsWon.length === cards.length/2) {
      resultView.textContent = 'Félicitations! vous avez reussi finir le jeux des paires.';
    }
  }

  const dialog = document.getElementById('#dialog');
  const closeDialog = document.getElementById('#closeDialog');


  //tournee les cartes
  function flipCard() {
    let cardId = this.getAttribute('data-id');
    cardsChosen.push(cards[cardId].name);
    // console.log(cardsChosen);
    cardsChosenId.push(cardId);
    // console.log(cardsChosenId);
    this.setAttribute('src', cards[cardId].img);
    if (cardsChosen.length ===2) {
      setTimeout(checkForMatch, 500);
    }
  }

  createBoard();
})


