import React from 'react';
import { Document, Page, Text, View, StyleSheet, PDFViewer, Image,  } from "@react-pdf/renderer";
import logo from './imagen/logo1.png'
import Fecha from './fecha';



  // Create styles
  const styles = StyleSheet.create({
    page: {
      color: "black",
    },
    section: {
      margin: 10,
      padding: 10,
      textAlign: "center",
      fontSize: 12
    },
    viewer: {
      width: window.innerWidth, //the pdf viewer will take up all of the width and height
      height: window.innerHeight,
    },
    fecha: {
        margin: 10,
        padding: 10,
        fontSize: 12
    },
    logo: {
        width: 100,
        height: 50,
    }
  });
  
  // Create Document Component
  function FormatoVerPDF() {
    return (
      <PDFViewer style={styles.viewer}>
        {/* Start of the document*/}
        <Document>
          {/*render a single page*/}
          <Page size="letter" style={styles.page}>
            <View style={styles.section}>
              <Text
                style={styles.text}
                render={({ pageNumber, totalPages }) =>
                  `Pagina ${pageNumber} de ${totalPages}`
                }
                fixed
              />
              <Image style={styles.logo} source={logo}></Image>
              <Text>REPORTE DE CATEGORIAS</Text>
              <Text>DEL 01 AL 31 DE NOVIEMBRE</Text>
              <Text>SUCURSAL PRINCIPAL</Text> 
            </View>
            <View style={styles.fecha}>
                <Text>Fecha: <Fecha /></Text>
            </View>
            <View style={styles.fecha}>
              <Text>
                Datos
              </Text>
            </View>
          </Page>
          <Page size="letter" style={styles.page}>
            <View style={styles.section}>
              <Text
                style={styles.text}
                render={({ pageNumber, totalPages }) =>
                  `Pagina ${pageNumber} de ${totalPages}`
                }
                fixed
              />
              <Image style={styles.logo} source={logo}></Image>
              <Text>REPORTE DE CATEGORIAS</Text>
              <Text>DEL 01 AL 31 DE NOVIEMBRE</Text>
              <Text>SUCURSAL PRINCIPAL</Text> 
            </View>
            <View style={styles.fecha}>
                <Text>Fecha: <Fecha /></Text>
            </View>
            <View style={styles.fecha}>
                <Text>
                  Datos
                </Text>
            </View>
            <Text
              break style={styles.text}>
              Siguiente pagina
            </Text>
          </Page>
        </Document>
      </PDFViewer>
    );
  }
  export default FormatoVerPDF;