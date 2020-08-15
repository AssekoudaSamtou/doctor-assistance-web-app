import GIRL_AVATAR from './data/profile/girl-avataaar.svg';
import BOY_AVATAR from './data/profile/boy-avataaar.svg';

const MONTHS = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
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

const LitteralDate = (date) => {
    var d = new Date(date);
    return `${WEEKDAYS[d.getDay()]} ${d.getDay()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
}


export {GIRL_AVATAR, BOY_AVATAR, LitteralDate};
export default computedAge;