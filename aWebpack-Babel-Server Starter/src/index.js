import _ from 'lodash';

function component() {
  var element = document.createElement('div');

  element.innerHTML = _.join(['Hello', 'webpack2'], ' ');

  return element;
}

document.body.appendChild(component());

//-----------------
import {person, sayHello} from './lib';

// alert(person.name);
// alert(sayHello(person.name));

// let test = () => console.log(456);
// test();

async function getPosts() {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');

  const data = await response.json();
  return data;
}

getPosts().then(posts => console.log(posts));