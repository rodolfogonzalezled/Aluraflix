import styles from "./Banner.module.css";

function Banner({ img, color }) {
  return (
    <div
      className={styles.capa}
      style={{ backgroundImage: `url("/img/banner-${img}.png")` }}
    >
      <div className={styles.gradient} style={{ background: `${color}` }}>
        <div className="{styles.banner}"> 
        <p className="{styles.banner-tex}"> FRONT</p>
        <p className="{styles.banner-img}"> FOTO</p>
        </div>
      </div>
    </div>
  );
}

export default Banner;