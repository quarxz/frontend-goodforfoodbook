import { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/UserContext";

// import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import {
  PDFDownloadLink,
  PDFViewer,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";

// Define the component to render the PDF
const MyPDF = ({ listItems }) => (
  <Document>
    <Page style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>List Items</Text>
        {listItems.map((item, index) => (
          <Text key={index} style={styles.item}>
            {item}
          </Text>
        ))}
      </View>
    </Page>
  </Document>
);

// Define the component to render the PDF download link
const PDFComponent = ({ listItems }) => (
  <div>
    <h1>List Items PDF</h1>
    <PDFDownloadLink document={<MyPDF listItems={listItems} />} fileName="list_items.pdf">
      {({ blob, url, loading, error }) => (loading ? "Loading document..." : "Download PDF")}
    </PDFDownloadLink>
  </div>
);

export function ShoppingBasket() {
  const [listItems, setListItems] = useState(["Item 1", "Item 2", "Item 3", "Item 4"]);
  const { user } = useContext(UserContext);
  return (
    <>
      <div>
        <h1>List Items</h1>
        <ul>
          {listItems.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        <PDFComponent listItems={listItems} />
      </div>
    </>
  );
}
