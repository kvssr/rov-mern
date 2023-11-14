import { PieChart } from "devextreme-react";
import {
  Annotation,
  Border,
  CommonAnnotationSettings,
  Font,
  Image,
  Label,
  Legend,
  Series,
} from "devextreme-react/pie-chart";
import { useGetProfessionsQuery } from "state/api";
import { ProfessionIconLink } from "assets/profession_icons/ProfessionIcon";
import { CircularProgress } from "@mui/material";

const ProfPieChart = ({ characters, characterList }) => {
  const { data: professions } = useGetProfessionsQuery();

  if (!characters) {
    return <CircularProgress color="info" />;
  }

  const customizePoint = (point) => {
    const profName = point.argument;
    const prof = professions.find((p) => p.name === profName);
    return { color: prof.color };
  };

  const profDist = calculateProfDist(characters, characterList);

  return (
    <PieChart
      id="pie"
      dataSource={profDist}
      customizePoint={customizePoint}
    >
      <CommonAnnotationSettings
        type="image"
        color="transparent"
        paddingLeftRight={0}
        paddingTopBottom={-25}
      >
        <Image
          height={20}
          width={20}
        />
      </CommonAnnotationSettings>
      {profDist.map((item) => (
        <Annotation
          key={item.prof}
          argument={item.prof}
          data={item.value}
        >
          <Image url={ProfessionIconLink(item.prof)} />
          <Border visible={false} />
        </Annotation>
      ))}
      <Series
        argumentField="prof"
        valueField="value"
      >
        <Label
          visible
          position="inside"
          radialOffset={30}
          backgroundColor="transparent"
        >
          <Font
            size={16}
            weight={600}
          />
        </Label>
      </Series>
      <Legend verticalAlignment="Middle"></Legend>
    </PieChart>
  );
};

const calculateProfDist = (characters, characterList) => {
  const profList = [];
  const profDist = [];
  characters.forEach((row) => {
    const character = characterList[row.id];
    if (character) {
      if (profList.includes(character.profession.name)) {
        let dist = profDist.find(
          (dist) => dist.prof === character.profession.name
        );
        dist.value += 1;
      } else {
        profList.push(character.profession.name);
        profDist.push({
          prof: character.profession.name,
          value: 1,
        });
      }
    }
  });
  return profDist;
};

export default ProfPieChart;
