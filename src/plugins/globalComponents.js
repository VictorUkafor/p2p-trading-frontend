import Card from "../components/Card";
import Icon from "../components/Icon";

export default {
  install(Vue) {
    Vue.component(Card.name, Card);
    Vue.component(Icon.name, Icon);
  }
};
