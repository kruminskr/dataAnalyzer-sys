const queyProcesor = (req, res) => {
    try {
        // query model
        // turns the user query into:
        // neededData = {countries: ['Germany'], years: [2020,2021,2022], dataType: 'housing'}

        // data model
        // Turns the neededData into actual data from eurostat API
        // data = [{year: 2020, value: 1200}, {year: 2021, value: 1350}, ...]

        // ai model
        // turns the data into a response
        // "Latvia's housing prices increased by 15%..."

        const response = {
            message: 'This is a mock response from the AI model',   
        }

        return res.status(200).json(
            response
        );
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }

}

module.exports = {
    queyProcesor
};