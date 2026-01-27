import captainModel from '../models/captain.model'

export const createCaptain = async ({
  firstname,
  lastname,
  email,
  password,
  color,
  plate,
  capacity,
  vechilesType,
}) => {
  if (
    !firstname ||
    !lastname ||
    !email ||
    !password ||
    !color ||
    !plate ||
    !capacity ||
    !vechilesType
  ) {
    return res.status(400).json({message: "All fields are required"})
  }

  const captain = await captainModel.create({
     fullname: {
            firstname,
            lastname,
        },
        email,
        password,
        vehicles: {
            color,
            plate,
            vechilesType,
            capacity
        }
  })

  return captain
};
