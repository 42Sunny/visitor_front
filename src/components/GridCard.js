import { Grid, Card, CardContent } from "@material-ui/core";

const GridCard = (props) =>
	<Grid {...props}>
		<Card>
			<CardContent >
				{props.children}
			</CardContent>
		</Card>
	</Grid>

export default GridCard;