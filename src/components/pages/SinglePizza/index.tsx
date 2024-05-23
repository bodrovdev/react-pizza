import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./SinglePizza.module.scss";

import Preloader from "../../common/Preloader";

type SinglePizzaState = {
  name: string,
  imageUrl: string,
  description: string,
};

function SinglePizza() {
  const { id } = useParams();
  const [singlePizza, setSinglePizza] = useState<SinglePizzaState>();

  const textBreak: string = "<br/><br/>";

  useEffect(() => {
    async function getSinglePizza() {
      try {
        const { data } = await axios.get(`https://653e4e07f52310ee6a9acea3.mockapi.io/items/${id}`);
        setSinglePizza(data);
      } catch (error) {
        console.log(error);
      }
    }

    getSinglePizza();
  }, [])

  if (!singlePizza) {
    return <Preloader />
  }

  return (
    <div className={styles.root}>
      <div className={`${styles.singlePizzaContainer} base-container`}>
        <h2 className='section-title'>{singlePizza.name}</h2>
        <img src={singlePizza.imageUrl} alt="" />
        <div dangerouslySetInnerHTML={{ __html: singlePizza.description.replace(/\n/g, textBreak) }}></div>
      </div>
    </div >
  )
}

export default SinglePizza