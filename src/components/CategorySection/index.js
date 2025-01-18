import styles from "./CategorySection.module.css";
import Card from "components/Card";

function CategorySection({ category, videos, onDelete, onUpdate }) {
    const obj = {
        backgroundColor: category.color
    };

    return (
        <div>
            <div className={styles.name} style={obj}>
                {category.name}
            </div>
            <section className={styles.container}>
                {videos.map((video) => {
                    return <Card video={video} key={video.id} color={category.color} onDelete={onDelete} onUpdate={onUpdate} />;
                })}
            </section>
        </div>
    );
}
export default CategorySection;
