const sdmxConverter = (data, dimensions) => {
    const convertedData = [];

    const dataValues = data.value;
    const geoDimension = dimensions.geo;
    const timeDimension = dimensions.time;

    const geoLabels = geoDimension.category.label;
    const geoIndices = geoDimension.category.index;
    const timeLabels = timeDimension.category.label;
    const timeIndices = timeDimension.category.index;

    const idOrder = data.id;
    const sizes = data.size;
    const timeDimensionIndexInId = idOrder.indexOf('time');
    const sizeOfTime = sizes[timeDimensionIndexInId];

    const params = {}

    for (const dimKey in dimensions) {
        if (dimKey === 'geo' || dimKey === 'time') {
            continue; 
        }

        const dim = dimensions[dimKey];
        const labelKey = dim.label; 

        const categoryLabel = dim.category?.label;
        if (categoryLabel) {
            const onlyValue = Object.values(categoryLabel)[0]; 
            params[labelKey] = onlyValue;
        }
    }

    for (const geoCode in geoLabels) {
        if (geoLabels.hasOwnProperty(geoCode)) {
            const geoIndex = geoIndices[geoCode];

            const countryData = {
                datasetTitle: data.label, 
                datasetDetails: params,
                years: []
            };

            for (const yearCode in timeLabels) {
                if (timeLabels.hasOwnProperty(yearCode)) {
                    const year = timeLabels[yearCode];
                    const timeIndex = timeIndices[yearCode];

                    const flatIndex = (geoIndex * sizeOfTime) + timeIndex;

                    const value = dataValues.hasOwnProperty(String(flatIndex)) ? dataValues[String(flatIndex)] : null;

                    if (value !== null) {
                        countryData.years.push({
                            year: year,
                            value: value
                        });
                    }
                }
            }
            convertedData.push(countryData);
        }
    }

    return convertedData;
}

module.exports = {
  sdmxConverter 
};