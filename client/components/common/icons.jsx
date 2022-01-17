import {
  faTv,
  faUtensils,
  faHamburger,
  faHammer,
  faCat,
  faWifi,
  faBook,
  faCar,
  faCarrot,
  faServer,
  faHeart,
  faPlay,
  faShoppingBasket,
  faCreditCard,
  faMoneyBill,
  faPlane,
  faStar,
  faTshirt,
  faCoffee,
  faPills
} from '@fortawesome/free-solid-svg-icons'

const GetIcon = (icon) => {
  switch (icon) {
    case 'faTv': {
      return faTv
    }
    case 'faUtensils': {
      return faUtensils
    }
    case 'faHamburger': {
      return faHamburger
    }
    case 'faHammer': {
      return faHammer
    }
    case 'faCat': {
      return faCat
    }
    case 'faWifi': {
      return faWifi
    }
    case 'faBook': {
      return faBook
    }
    case 'faCar': {
      return faCar
    }
    case 'faCarrot': {
      return faCarrot
    }
    case 'faServer': {
      return faServer
    }
    case 'faHeart': {
      return faHeart
    }
    case 'faPlay': {
      return faPlay
    }
    case 'faShoppingBasket': {
      return faShoppingBasket
    }
    case 'faCreditCard': {
      return faCreditCard
    }
    case 'faMoneyBill': {
      return faMoneyBill
    }
    case 'faPlane': {
      return faPlane
    }
    case 'faTshirt': {
      return faTshirt
    }
    case 'faCoffee': {
      return faCoffee
    }
    case 'faPills': {
      return faPills
    }

    default:
      return faStar
  }
}

export default GetIcon
