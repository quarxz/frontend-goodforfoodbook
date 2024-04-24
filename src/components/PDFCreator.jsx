import styles from "./PDFCreator.module.css";
import { useRef, forwardRef, useImperativeHandle } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

import Grid from "@mui/material/Unstable_Grid2/Grid2";

const PDFCreator = forwardRef(({ shoppingList, user }, ref) => {
  const listRef = useRef(null);

  console.log(shoppingList);
  console.log(user);

  const generatePDF = () => {
    // Show the list for rendering
    listRef.current.style.display = "block";

    // Create a new jsPDF instance
    const pdf = new jsPDF("p", "pt", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    // Convert list to canvas
    html2canvas(listRef.current).then((canvas) => {
      const imageData = canvas.toDataURL("image/png");
      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imageData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save("list.pdf");

      // Hide the list again
      listRef.current.style.display = "none";
    });
  };

  // Use useImperativeHandle to expose the function via ref
  useImperativeHandle(ref, () => ({
    generatePDF,
  }));

  return (
    <>
      {/* <button onClick={generatePDF}>Generate PDF</button> */}

      <Grid
        container
        ref={listRef}
        style={{ display: "none" }}
        sx={{ color: "#333", padding: "100px" }}
      >
        <Grid container spacing={1} direction="column" ml={10} mt={10}>
          <Grid>
            <h1>Good-for-FoodBook</h1>
          </Grid>
          <Grid mt={3}>
            <h2>Deine Zutatenliste:</h2>
          </Grid>
          <Grid mt={3}>
            <h3>Lieferadresse:</h3>
          </Grid>
          <Grid container direction="row" mt={3}>
            <Grid width={100}>Name:</Grid>
            <Grid width={200}>{user?.name?.firstname}</Grid>
          </Grid>
          <Grid container direction="row">
            <Grid width={100}>Nachname:</Grid>
            <Grid width={200}>{user?.name?.lastname}</Grid>
          </Grid>
          <Grid container direction="row">
            <Grid width={100}>eMail:</Grid>
            <Grid width={200}>{user?.email}</Grid>
          </Grid>

          <Grid container direction="row" mt={3}>
            <Grid width={100}>Strasse:</Grid>
            <Grid width={200}>{`${user?.address?.street} ${user?.address?.number}`}</Grid>
          </Grid>
          <Grid container direction="row">
            <Grid width={100}>PLZ/Ort:</Grid>
            <Grid width={400}>{`${user?.address?.postcode} ${user?.address?.city}`}</Grid>
          </Grid>
          <Grid mt={3}>
            <h3>Zutaten:</h3>
          </Grid>
          <Grid container direction="column" mt={3}>
            {shoppingList.map((item, index) => (
              <Grid
                key={index}
              >{`${item.ingredient.name} ${item.quantity} ${item.ingredient.unit}`}</Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
});

export default PDFCreator;
