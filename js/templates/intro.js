import getElementFromTemplate from '../moduls/get-element-from-template';
import greetingPage from './greeting';
import changeContent from '../moduls/change-content';

const template = getElementFromTemplate(`<section class="intro">
<button class="intro__asterisk asterisk" type="button"><span class="visually-hidden">Продолжить</span>*</button>
<p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
</section>`);

template.querySelector(`.intro__asterisk`).addEventListener(`click`, () => {
  changeContent(greetingPage);
});
export default template;
