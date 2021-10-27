import { Context, Link, Sampler, SamplingDecision, SamplingResult, SpanAttributes, SpanKind } from "@opentelemetry/api";

export default class CustomSampler implements Sampler{
    shouldSample(context: Context, traceId: string, spanName: string, spanKind: SpanKind, attributes: SpanAttributes, links: Link[]): SamplingResult {
        if(attributes['user.paying'] === true){
            return {
                decision: SamplingDecision.RECORD_AND_SAMPLED
            }
        } else {
            return {
                decision: SamplingDecision.NOT_RECORD
            }
        }
    }
    toString(): string {
        return "";
    }
}