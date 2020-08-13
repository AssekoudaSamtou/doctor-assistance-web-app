import GIRL_AVATAR from './data/profile/girl-avataaar.svg';
import BOY_AVATAR from './data/profile/boy-avataaar.svg';

// const GIRL_AVATAR = "https://avataaars.io/?avatarStyle=Circle&topType=ShortHairShaggyMullet&accessoriesType=Blank&hairColor=Black&facialHairType=Blank&clotheType=BlazerShirt&eyeType=WinkWacky&eyebrowType=SadConcernedNatural&mouthType=Smile&skinColor=DarkBrown";
// const BOY_AVATAR = "https://avataaars.io/?avatarStyle=Circle&topType=ShortHairShortCurly&accessoriesType=Round&hairColor=BrownDark&facialHairType=MoustacheMagnum&facialHairColor=Platinum&clotheType=BlazerSweater&eyeType=Default&eyebrowType=SadConcernedNatural&mouthType=Vomit&skinColor=DarkBrown";

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
export {GIRL_AVATAR, BOY_AVATAR};
export default computedAge;