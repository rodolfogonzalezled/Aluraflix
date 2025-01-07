import styles from "./CategorySection.module.css";
import Card from "components/Card";

function CategorySection({ category, videos, onDelete }) {
    const obj = {
        backgroundColor: category.color
    };


    return (
        <div>
            <div className={styles.name} style={obj}>
                {category.name}
            </div>
            <div style={{ display: 'flex' }}>
                <section className={styles.container}>
                    {videos.map((video) => {
                        return <Card {...video} key={video.id} color={category.color} onDelete={onDelete}/>;
                    })}
                </section>
            </div>
        </div>
    );
}
export default CategorySection;
