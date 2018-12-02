// import getIntroPage from './templates/intro';
// import changeContent from './moduls/change-content';

// changeContent(getIntroPage());

import Game from './data/game';
import mainApp from './application-controller';

const game = new Game();
mainApp(game);
