import {
  PDFDownloadLink,
  PDFViewer,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";

import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { Box, Button, Stack } from "@mui/material";

import { lightGreen, grey, red, orange, deepOrange, green } from "@mui/material/colors";
import PrintSharpIcon from "@mui/icons-material/PrintSharp";

// Create styles
const styles = StyleSheet.create({
  page: {
    color: grey[600],
    textAlign: "left",
    margin: 30,
    flexDirection: "column",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  title_h1: {
    fontSize: 21,
    lineHeight: 3,
  },
  title_h2: {
    fontSize: 14,
    lineHeight: 2.5,
  },
  item: {
    fontSize: 12,
    lineHeight: 1.5,
    flexDirection: "row",

    width: "90%",
  },
});

// Define the component to render the PDF
const MyPDF = ({ shoppingList, user }) => (
  <Document>
    <Page size="A5" style={styles.page}>
      <View style={{ margin: 10, padding: 10 }}>
        <Text style={styles.title_h1}>Good-for-FoodBook</Text>
        <Text style={styles.title_h2}>Lieferadresse:</Text>
        <View style={styles.item}>
          <Text style={{ width: 100 }}>Name: </Text>
          <Text>
            {user?.name?.firstname.charAt(0).toUpperCase() + user?.name?.firstname.slice(1)}
          </Text>
        </View>
        <View style={styles.item}>
          <Text style={{ width: 100 }}>Nachname: </Text>
          <Text>
            {user?.name?.lastname.charAt(0).toUpperCase() + user?.name?.lastname.slice(1)}
          </Text>
        </View>
        <View style={styles.item}>
          <Text style={{ width: 100 }}>eMail: </Text>
          <Text>{user?.email}</Text>
        </View>
        <View style={styles.item}>
          <Text style={{ width: 100 }}>Strasse:</Text>
          <Text>{`${user?.address?.street} ${user?.address?.number}`}</Text>
        </View>
        <View style={styles.item}>
          <Text style={{ width: 100 }}>PLZ/Ort:</Text>
          <Text>{`${user?.address?.postcode} ${user?.address?.city}`}</Text>
        </View>
      </View>
      <View style={{ margin: 10, padding: 10, flexGrow: 1 }}>
        <Text style={styles.title_h2}>Deine Zutatenliste:</Text>
        {shoppingList?.map((item, index) => (
          <View key={index} style={styles.item}>
            <Text style={{ width: 150 }}>{`${item?.ingredient?.name}`}</Text>
            <Text>{`${item?.quantity} ${item?.ingredient?.unit}`}</Text>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

// Define the component to render the PDF download link
const PDFCreator = ({ shoppingList, user }) => (
  <Box>
    <PDFDownloadLink
      document={<MyPDF shoppingList={shoppingList} user={user} />}
      fileName="good-for-foodBook_Zutaten_Liste.pdf"
    >
      {({ blob, url, loading, error }) =>
        loading ? (
          "Loading document..."
        ) : (
          <Button
            variant="outlined"
            // sx={{ color: red[900] }}
            startIcon={<PrintSharpIcon />}
            size="large"
          >
            Liste als PDF ausdrucken
          </Button>
        )
      }
    </PDFDownloadLink>
  </Box>
);

export default PDFCreator;
