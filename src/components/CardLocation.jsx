import { Card, CardBody, CardHeader, Image } from '@nextui-org/react'
import { PropTypes } from 'prop-types'

const CardLocation = ({ point, selectFunction }) => {
  return (
    <div
      className="m-0 p-0 hover:cursor-pointer"
      onClick={() => selectFunction()}>
      <Card className="py-4 hover:bg-gray-200">
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
          <h4 className="font-bold text-large">{point.title}</h4>
          <p className="text-tiny uppercase font-bold">{point.description}</p>
        </CardHeader>
        <CardBody className="overflow-visible py-2">
          <Image
            alt="Card background"
            className="object-cover rounded-xl"
            src={point.image}
          />
        </CardBody>
      </Card>
    </div>
  )
}
CardLocation.propTypes = {
  point: PropTypes.exact({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired
  }).isRequired,
  selectFunction: PropTypes.func.isRequired
}

export default CardLocation
