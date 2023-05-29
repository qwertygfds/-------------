import { useNavigate } from "react-router-dom";
import styles from "./NotPage.module.css";
import { Button } from "../../components";

export const NotPage = (): JSX.Element => {
	const navigate = useNavigate();
	return (
		<div className={styles.container}>
			<p style={{ fontSize: 350 }}>404</p>
			<p>К сожалению, запрашиваемая вами страница не найдена.</p>
			<p>Возможно, она была удалена или вы перешли по устаревшей ссылке.</p>
			<Button appearance="green" onClick={() => navigate("/")}>
				На главную
			</Button>
		</div>
	);
};
