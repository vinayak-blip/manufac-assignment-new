![image](https://github.com/vinayak-blip/manufac-assignment-new/assets/65493435/b2366cfc-8f8f-4bc2-9892-006f6bfc4c39)



This React component, WineStatsTableWithGamma, is designed to visualize data from a wine dataset. The dataset consists of various properties for different wine samples, including "Ash," "Hue," "Magnesium," and an additional property, "Gamma," which is calculated based on the formula (Ash * Hue) / Magnesium.

Original Dataset Table: The component begins by rendering a table for the original wine dataset. This table displays information such as "Alcohol Class," "Mean," "Median," and "Mode" for each property. Each row corresponds to a unique wine entry, and the information is dynamically populated based on the provided dataset.

Class-wise Statistics of "Gamma" Table: Afterwards, the component calculates the "Gamma" property for each data point and computes class-wise statistics, including the mean, median, and mode of "Gamma" for each alcohol class. This information is then displayed in a separate table, providing insights into how the calculated "Gamma" property varies across different alcohol classes.

Build the Project:

for installing the node-modules according to package.json

#npm install

If the project uses a build system, you may need to build the project before running it. Run:

#npm run build

Run/Start the Project:

#npm start
