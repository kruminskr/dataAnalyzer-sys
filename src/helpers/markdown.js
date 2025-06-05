const convertDataToMarkdown = (dataArray) => {
    let markdown = "";

    dataArray.forEach(countryEntry => {
        const country = countryEntry.country;

        countryEntry.data.forEach(dataTypeEntry => {
            const dataType = dataTypeEntry.dataType;
            markdown += `### ${dataType.toUpperCase()} - ${country.charAt(0).toUpperCase() + country.slice(1)}\n\n`;
            markdown += `| Year | Value  |\n|------|--------|\n`;

            dataTypeEntry.years.forEach(yearEntry => {
                markdown += `| ${yearEntry.year} | ${yearEntry.value} |\n`;
            });

            markdown += `\n`;
        });
    });

    return markdown;
}

module.exports = {
    convertDataToMarkdown
};  