import { FC, Fragment } from 'react';
import Pageheader from '../../../components/pageheader/pageheader';
import { Gallerylist } from './data/gallerydata';


const Gallery= () => {
  return (
    <Fragment>
      <Pageheader title="Gallery" heading="Apps" active="Gallery" />
      <Gallerylist />
    </Fragment>
  );
};

export default Gallery;
