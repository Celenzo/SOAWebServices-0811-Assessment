<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:template match="/">
<html> 
<body>
  <h4>Share Links</h4>
  <table border="1" select="response">
    <tr>
      <th style="text-align:left">Urls</th>
    </tr>
    <tr>
      <td><xsl:value-of select="response/long"/></td>
    </tr>
    <tr>
      <td><xsl:value-of select="response/short"/></td>
    </tr>
  </table>
</body>
</html>
</xsl:template>
</xsl:stylesheet>