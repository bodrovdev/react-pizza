import React from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import styles from './PizzaSkeleton.module.scss';
import '../../scss/style.scss';

function PizzaSkeleton() {
  return (
    <SkeletonTheme baseColor="#202020" highlightColor="#444">

    </SkeletonTheme >
  )
}

export default PizzaSkeleton