import styled, { keyframes } from "styled-components";
import Flex from "./flex";

const spinAnimation = keyframes`
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
`;

const StyledSpinner = styled.div`
	animation: ${spinAnimation} 1.5s linear infinite;
	width: 40px;
	height: 40px;
	border: 5px solid #d9d9d9;
	border-radius: 50%;
	border-top-color: #6f6f6f;
`;

function Spinner({ ...props }) {
	return (
		<Flex>
			<StyledSpinner {...props} />
		</Flex>
	);
}

export default Spinner;
