import LogoImage from 'src/assets/images/logo.svg'
import { Link } from 'react-router-dom'
const Logo = ({ className }: { className: string }) => (
	<Link to="/">
		<img
			className={`${className} tw-fill-white`}
			src={LogoImage}
			alt="Innoscripta"
		/>
	</Link>
)

export default Logo
