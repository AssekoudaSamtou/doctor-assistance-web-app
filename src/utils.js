import GIRL_AVATAR from './data/profile/girl-avataaar.svg';
import BOY_AVATAR from './data/profile/boy-avataaar.svg';

const MONTHS = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
const SMALL_MONTHS = ["Janv", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Août", "Sept", "Oct", "Nov", "Déc"];
const WEEKDAYS = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

const computedAge = (date_naissance) => {
    var today = new Date();
    var birthDate = new Date(date_naissance);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

const LitteralDate = (date, format="LARGE") => {
    var d = new Date(date);
    if (format === "LARGE")
        return `${WEEKDAYS[d.getDay()]} ${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
    
    if (format === "SMALL")
        return `${d.getDate()} ${SMALL_MONTHS[d.getMonth()]} ${d.getFullYear()}`;
}

const random_item = (items) => {
    return items[Math.floor(Math.random()*items.length)];
}


export {GIRL_AVATAR, BOY_AVATAR, LitteralDate, random_item};
export default computedAge;