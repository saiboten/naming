import React from 'react';
// import { LinkButton } from '../../components/LinkButton';


export const CreateName = () => (
  <div>
    <p>Velg kallenavn</p>
    <form>
      <input type="text" placeholder="Kallenavn" />
      <input id="boy" type="radio" value="boy" /><label htmlFor="boy">Gutt</label>
      <input id="girl" type="radio" value="girl" /><label htmlFor="girl">Jente</label>
      <input type="submit" value="OK" />
    </form>

  </div>);
