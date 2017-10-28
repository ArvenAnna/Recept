<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.1" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" 
    xmlns:fo="http://www.w3.org/1999/XSL/Format" exclude-result-prefixes="fo">
<xsl:template match="Recept">
    <fo:root xmlns:fo="http://www.w3.org/1999/XSL/Format">
      <fo:layout-master-set>
        <fo:simple-page-master master-name="simpleA4" page-height="29.7cm" page-width="21cm" margin-top="2cm" margin-bottom="2cm" margin-left="2cm" margin-right="2cm">
          <fo:region-body/>
        </fo:simple-page-master>
      </fo:layout-master-set>
      <fo:page-sequence master-reference="simpleA4">
        <fo:flow flow-name="xsl-region-body">
          <fo:block font-family="Miroslav" font-size="24pt" font-weight="bold" space-after="5mm" text-align="center"><xsl:value-of select="Name"/></fo:block>
	    <fo:block font-family="Miroslav" font-size="12pt" space-after="5mm">
              <xsl:apply-templates select="Proportions"/>
          </fo:block>
		<fo:block font-family="Miroslav" font-size="16pt"><xsl:value-of select="Description" space-after="5mm"/></fo:block>
		<fo:block text-align="center">
              <fo:external-graphic src="picture.png" content-width="scale-to-fit" width="10cm"/>
          </fo:block>
        </fo:flow>
      </fo:page-sequence>
     </fo:root>
</xsl:template>

<xsl:template match="Proportions">
      <fo:table table-layout="fixed" width="100%" border-collapse="separate">    
	      <fo:table-column column-width="5cm"/>
            <fo:table-column column-width="5cm"/>
            <fo:table-column column-width="5cm"/>
            <fo:table-body>
				<xsl:if test="Proportion">
					<xsl:apply-templates select="Proportion"/>
				</xsl:if>
				<xsl:if test="not(Proportion)">
					<fo:table-cell><fo:block /></fo:table-cell>
				</xsl:if>
			</fo:table-body>
      </fo:table>
 </xsl:template>

<xsl:template match="Proportion">
    <fo:table-row> 
      <fo:table-cell>
        <fo:block>
        </fo:block>
      </fo:table-cell>	
      <fo:table-cell>
        <fo:block>
          <xsl:value-of select="Ingridient"/>
        </fo:block>
      </fo:table-cell>
      <fo:table-cell>
        <fo:block>
          <xsl:value-of select="Norma"/>
        </fo:block>
      </fo:table-cell>   
    </fo:table-row>
  </xsl:template>
</xsl:stylesheet>