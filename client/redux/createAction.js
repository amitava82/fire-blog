/**
 * Created by amitava on 01/07/16.
 */
const app = 'blog';

export default function (module, constants) {
  return constants.map(i => {
    return `${app}/${module}/${i}`;
  });
}