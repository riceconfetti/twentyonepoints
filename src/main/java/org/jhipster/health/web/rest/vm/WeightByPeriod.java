package org.jhipster.health.web.rest.vm;

import java.util.List;
import org.jhipster.health.domain.Weight;

public class WeightByPeriod {

    private String period;
    private List<Weight> readings;

    public WeightByPeriod(String period, List<Weight> readings) {
        this.period = period;
        this.readings = readings;
    }

    public String getPeriod() {
        return period;
    }

    public void setPeriod(String period) {
        this.period = period;
    }

    public List<Weight> getReadings() {
        return readings;
    }

    public void setReadings(List<Weight> readings) {
        this.readings = readings;
    }

    @Override
    public String toString() {
        return "WeightByPeriod [period=" + period + ", readings=" + readings + "]";
    }
}
