'use client'

import React from 'react'
import { useLocale } from '@/app/locale-provider'

const annualReport = () => {
  const { t } = useLocale()
  return (
    <div>{t("annualReportPage.title")}</div>
  )
}

export default annualReport